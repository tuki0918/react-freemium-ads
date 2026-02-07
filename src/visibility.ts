import type { AdConfig, Plan } from "./types";

export function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  const withoutQuery = path.split("?")[0] ?? "/";
  const withoutHash = withoutQuery.split("#")[0] ?? "/";

  if (!withoutHash || withoutHash === "") {
    return "/";
  }

  return withoutHash.startsWith("/") ? withoutHash : `/${withoutHash}`;
}

function pathMatchesPrefix(path: string, prefix: string): boolean {
  const normalizedPath = normalizePath(path);
  const normalizedPrefix = normalizePath(prefix);

  if (normalizedPrefix === "/") {
    return normalizedPath === "/";
  }

  return (
    normalizedPath === normalizedPrefix ||
    normalizedPath.startsWith(`${normalizedPrefix}/`)
  );
}

function matchesAnyPrefix(path: string, prefixes?: string[]): boolean {
  if (!prefixes || prefixes.length === 0) {
    return false;
  }

  return prefixes.some((prefix) => pathMatchesPrefix(path, prefix));
}

export function shouldShowAds(
  plan: Plan,
  currentPath: string,
  config: AdConfig,
): boolean {
  if (plan === "premium") {
    return false;
  }

  if (matchesAnyPrefix(currentPath, config.blockedPaths)) {
    return false;
  }

  if (
    config.allowedPaths &&
    config.allowedPaths.length > 0 &&
    !matchesAnyPrefix(currentPath, config.allowedPaths)
  ) {
    return false;
  }

  return true;
}
