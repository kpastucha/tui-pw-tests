/**
 * Utility class providing helper methods for generating random data
 * to support non-deterministic testing scenarios.
 */
export class RandomUtil {
  /**
   * Selects a random element from the provided array.
   * Uses generic type <T> to ensure type safety of the returned element.
   *
   * @template T The type of elements in the array.
   * @param {T[]} elements - An array of items to select from (e.g., airports, dates).
   * @returns {T} A randomly selected element from the array.
   * @throws {Error} If the provided array is empty.
   */
  static getRandomElement<T>(elements: T[]): T {
    if (elements.length === 0) {
      throw new Error('Cannot select a random element from an empty array.');
    }
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  }

  /**
   * Generates a random integer between 0 and the specified maximum value (inclusive).
   *
   * @param {number} max - The maximum possible value.
   * @returns {number} A random integer within the [0, max] range.
   */
  static getRandomInt(max: number): number;

  /**
   * Generates a random integer between the specified minimum and maximum values (inclusive).
   * Useful for generating random ages or selecting indices.
   *
   * @param {number} min - The minimum possible value.
   * @param {number} max - The maximum possible value.
   * @returns {number} A random integer within the [min, max] range.
   */
  static getRandomInt(min: number, max: number): number;

  /**
   * Implementation of the random integer generator.
   */
  static getRandomInt(minOrMax: number, max?: number): number {
    const min = max !== undefined ? minOrMax : 0;
    const finalMax = max !== undefined ? max : minOrMax;
    return Math.floor(Math.random() * (finalMax - min + 1)) + min;
  }
}
