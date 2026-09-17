import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const exactVersion = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.]+)?$/

function directDependencies(packageJson) {
  return {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  }
}

function lockfileEntry(lockfile, name) {
  return lockfile.packages[`node_modules/${name}`]
}

async function publishedIntegrity(name, version) {
  const url = new URL(`/${name}/${version}`, "https://registry.npmjs.org")
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) })

  if (!response.ok) {
    throw new Error(`${url.href} responded ${response.status}`)
  }

  const metadata = await response.json()
  return metadata.dist.integrity
}

const packageJson = JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"))
const lockfile = JSON.parse(await readFile(path.join(projectRoot, "package-lock.json"), "utf8"))
const dependencies = directDependencies(packageJson)
const errors = []

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
  if (!location || typeof metadata.resolved !== "string" || !metadata.resolved.startsWith("https://")) {
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
    const published = await publishedIntegrity(name, version)

    if (published !== locked.integrity) {
      errors.push(
        `${name}@${version} lockfile integrity does not match the registry SHA (${published})`
      )
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Skipping registry SHA check for ${name}@${version}: ${message}`)
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `error: ${error}`).join("\n"))
  process.exit(1)
}

console.log("Checked pinned versions and lockfile integrity hashes.")
