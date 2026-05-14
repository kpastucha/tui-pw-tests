import { expect, Locator } from '@playwright/test';
import { step } from './step.decorator.js';

/**
 * Utility class dedicated to centralized test assertions.
 */
export class AssertionUtil {
  /**
   * Asserts a visual regression check on a given locator with automated element masking.
   *
   * @param {Locator} locator - The element to capture for the visual check.
   * @param {string} screenshotName - Unique name for the baseline snapshot image file without extension.
   * @param {Locator} maskLocator - The element containing dynamic data to be masked with a solid color.
   */
  @step('Assert masked screenshot')
  static async assertMaskedScreenshot(
    locator: Locator,
    screenshotName: string,
    maskLocator: Locator
  ): Promise<void> {
    await expect(locator).toHaveScreenshot(`${screenshotName}.png`, {
      mask: [maskLocator],
      timeout: 15000
    });
  }
}
