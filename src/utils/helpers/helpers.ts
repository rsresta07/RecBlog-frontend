export function truncateHTML(html: string, limit: number): string {
  const plainText = html.replace(/<[^>]*>/g, ""); // Strip HTML
  const truncated = plainText.slice(0, limit);
  return `${truncated}...`;
}
