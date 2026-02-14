/**
 * Format a number as USD currency
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string (e.g., "$50,000")
 */
export function formatCurrency(value) {
  if (value === null || value === undefined) {
    return "$0";
  }

  const hasFraction = value % 1 !== 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // Make sure we never have $12.5, but instead $12.50
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format an ISO date string to human-readable format
 * @param {string} dateString - ISO date string (e.g., "2024-06-01")
 * @returns {string} Formatted date (e.g., "Jun 1, 2024")
 */
export function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Format a number as a percentage
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage (e.g., "2.8%")
 */
export function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined) {
    return "0%";
  }

  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a number with thousands separators
 * @param {number} value - The value to format
 * @returns {string} Formatted number (e.g., "125,000")
 */
export function formatNumber(value) {
  if (value === null || value === undefined) {
    return "0";
  }

  return new Intl.NumberFormat("en-US").format(value);
}
