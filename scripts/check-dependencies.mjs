import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const exactVersion = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.]+)?$/

export function isMainModule(metaUrl, argv1 = process.argv[1]) {
  if (!argv1) {
    return false
  }

  return pathToFileURL(path.resolve(argv1)).href === metaUrl
}

export function directDependencies(packageJson) {
  return {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  }
}

export function lockfileEntry(lockfile, name) {
  return lockfile.packages[`node_modules/${name}`]
}

export async function publishedIntegrity(name, version, fetchImpl = fetch) {
  const url = new URL(`/${name}/${version}`, "https://registry.npmjs.org")
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(15000) })

  if (!response.ok) {
    throw new Error(`${url.href} responded ${response.status}`)
  }

  const metadata = await response.json()
  return metadata.dist.integrity
}

export async function collectDependencyErrors(
  packageJson,
  lockfile,
  fetchImpl = fetch
) {
  const dependencies = directDependencies(packageJson)
  const errors = []
  const warnings = []

  for (const [name, version] of Object.entries(dependencies)) {
    if (!exactVersion.test(version)) {
      errors.push(`${name} must be pinned to an exact version (found "${version}")`)
      continue
    }

    const locked = lockfileEntry(lockfile, name)

    if (!locked) {
      errors.push(`${name} is missing from package-lock.json`)
      continue
    }

    if (locked.version !== version) {
      errors.push(`${name} is ${version} in package.json but ${locked.version} in the lockfile`)
    }

    if (!locked.integrity || !/^sha(512|384|256|1)-/.test(locked.integrity)) {
      errors.push(`${name} is missing a lockfile integrity hash`)
    }
  }

  for (const [location, metadata] of Object.entries(lockfile.packages)) {
    if (
      !location ||
      typeof metadata.resolved !== "string" ||
      !metadata.resolved.startsWith("https://")
    ) {
      continue
    }

    if (!metadata.integrity) {
      errors.push(`${location} is missing a lockfile integrity hash`)
    }
  }

  for (const [name, version] of Object.entries(dependencies)) {
    const locked = lockfileEntry(lockfile, name)

    if (!locked?.integrity) {
      continue
    }

    try {
      const published = await publishedIntegrity(name, version, fetchImpl)

      if (published !== locked.integrity) {
        errors.push(
          `${name}@${version} lockfile integrity does not match the registry SHA (${published})`
        )
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      warnings.push(`Skipping registry SHA check for ${name}@${version}: ${message}`)
    }
  }

  return { errors, warnings }
}

export async function runCheck({
  packageJson,
  lockfile,
  fetchImpl = fetch,
  log = console.log,
  warn = console.warn,
  error = console.error,
  exit = process.exit
} = {}) {
  const resolvedPackageJson =
    packageJson ?? JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"))
  const resolvedLockfile =
    lockfile ?? JSON.parse(await readFile(path.join(projectRoot, "package-lock.json"), "utf8"))
  const { errors, warnings } = await collectDependencyErrors(
    resolvedPackageJson,
    resolvedLockfile,
    fetchImpl
  )

  for (const warning of warnings) {
    warn(warning)
  }

  if (errors.length > 0) {
    error(errors.map((item) => `error: ${item}`).join("\n"))
    exit(1)
    return 1
  }

  log("Checked pinned versions and lockfile integrity hashes.")
  return 0
}

export async function start(options = {}) {
  const metaUrl = options.metaUrl ?? import.meta.url
  const argv1 = options.argv1 ?? process.argv[1]
  const run = options.run ?? runCheck

  if (!isMainModule(metaUrl, argv1)) {
    return false
  }

  await run()
  return true
}

await start()
