export function getDisplayImageSrc(src: string) {
  const trimmed = src.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return `/api/image-proxy?url=${encodeURIComponent(trimmed)}`;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (trimmed.startsWith("public/")) {
    return `/${trimmed.replace(/^public\//, "")}`;
  }

  return `/${trimmed.replace(/^\.\//, "")}`;
}

export function getAbsoluteImageUrl(src: string, siteUrl: string) {
  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  const normalizedPath = src.startsWith("/") ? src : `/${src.replace(/^public\//, "")}`;
  return `${siteUrl}${normalizedPath}`;
}