/**
 * Utility class for standardized logging across the test framework.
 * Provides methods for tables, warnings, and error reporting with timestamps.
 */
export class LogUtil {
  /**
   * Generates a current local time string for logging purposes.
   * @returns {string} Formatted timestamp (e.g., "14:30:05").
   */
  private static get timestamp(): string {
    return new Date().toLocaleTimeString();
  }

  /**
   * Logs data in a tabular format with a preceding descriptive message.
   *
   * @param {string} message - Description of the data being logged.
   * @param {unknown} data - The data object or array to be displayed in the table.
   * @param {string[]} [properties] - Optional array of property names to filter columns.
   */
  static table(message: string, data: unknown, properties?: string[]): void {
    this.warn(`TABLE: ${message}`);
    console.table(data, properties);
  }

  /**
   * Logs a warning message with a timestamp.
   *
   * @param {string} message - The message to be logged.
   */
  static warn(message: string): void {
    console.warn(`[${this.timestamp}] WARN: ${message}`);
  }

  /**
   * Logs an error message with a timestamp.
   *
   * @param {string} message - The error description to be logged.
   */
  static error(message: string): void {
    console.error(`[${this.timestamp}] ERROR: ${message}`);
  }
}
