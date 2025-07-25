/**
 * Truncates an HTML string to a specified length, appending ellipses if truncated.
 *
 * This function removes all HTML tags from the input string and returns a plain text
 * version truncated to the specified limit, followed by ellipses ("...").
 *
 * @param {string} html - The input HTML string to be truncated.
 * @param {number} limit - The maximum length of the truncated string.
 * @returns {string} A plain text string truncated to the specified length with ellipses.
 */
export function truncateHTML(html: string, limit: number): string {
  const plainText = html.replace(/<[^>]*>/g, ""); // Strip HTML
  const truncated = plainText.slice(0, limit);
  return `${truncated}...`;
}
