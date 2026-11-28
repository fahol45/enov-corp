/** Preserve path separators while encoding spaces and ampersands in local media paths. */
export function mediaSource(source: string): string {
  if (!source.startsWith("/")) return source;
  return source.split("/").map(part => { try { return encodeURIComponent(decodeURIComponent(part)); } catch { return encodeURIComponent(part); } }).join("/");
}
