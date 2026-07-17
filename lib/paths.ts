const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const basePath = configuredBasePath === "/"
  ? ""
  : configuredBasePath.replace(/\/$/, "");

export function assetPath(path: string): string {
  if (!path) return path;
  if (/^(?:[a-z]+:|\/\/|#)/i.test(path)) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath || normalized === basePath || normalized.startsWith(`${basePath}/`)) {
    return normalized;
  }
  return `${basePath}${normalized}`;
}
