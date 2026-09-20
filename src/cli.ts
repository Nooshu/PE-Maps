import path from "node:path"
import { pathToFileURL } from "node:url"

export function isMainModule(metaUrl: string, argv1 = process.argv[1]): boolean {
  if (!argv1) {
    return false
  }

  return pathToFileURL(path.resolve(argv1)).href === metaUrl
}

export async function runIfMain(
  metaUrl: string,
  run: () => Promise<unknown> | unknown,
  argv1 = process.argv[1]
): Promise<boolean> {
  if (!isMainModule(metaUrl, argv1)) {
    return false
  }

  await run()
  return true
}
