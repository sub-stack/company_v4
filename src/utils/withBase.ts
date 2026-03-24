const ABSOLUTE_URL_PATTERN = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

export function withBase(path: string): string {
  if (!path || path.startsWith("#") || ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL ?? "/";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (base === "/" || base === "") {
    return normalizedPath;
  }

  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalizedBase}${normalizedPath}`;
}
