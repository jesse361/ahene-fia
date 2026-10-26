import { existsSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const base = resolvePath(root, "src", specifier.slice(2));
    const file = [".ts", ".tsx", ""].map((extension) => base + extension).find((candidate) => existsSync(candidate));
    if (!file) return nextResolve(specifier, context);
    return nextResolve(pathToFileURL(file).href, context);
  }
  return nextResolve(specifier, context);
}
