/**
 * Formats an ISO UTC timestamp into a readable UTC string.
 * Example output:
 * 2026-01-22 13:45 UTC
 *
 * @param {string} isoString - ISO timestamp (UTC)
 * @returns {string}
 */
export function formatUTCTime(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return "";

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
}
