import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../data/search.field.type.js';
import { RandomUtil } from '../../../utils/random.util.js';
import { step } from '../../../utils/step.decorator.js';
import { BaseDropModalComponent } from './base.drop.modal.component.js';

export class DestinationDropModalComponent extends BaseDropModalComponent {
  private readonly _destinationCountryOptionsLocator: Locator = this.defaultLocator.locator(
    '.DestinationsList__link:not(.DestinationsList__disabled)'
  );
  /**
   * @todo Remove this workaround once the backend data bug is resolved.
   * @see Bug-Ticket: [TUI-1234]
   *
   * Temporary workaround:
   * Exclude specific city names from the random selection pool due to an application bug.
   * These cities are visible and enabled in the UI, but they return zero available
   * departure dates, which results in flaky test failures during the calendar steps.
   */
  private readonly _destinationCityOptionsLocator: Locator = this.defaultLocator.locator(
    '.DestinationsList__parentCheckbox:not(:has-text("Andalusië")):not(:has-text("Madeira")):not(:has-text("Sao Vicente")):not(:has-text("Valencia")):not(:has-text("Marsa Alam")) input:enabled'
  );

  constructor(page: Page) {
    super(page, SearchFieldType.Destination);
  }

  @step('Select random destination')
  async selectRandomOption(): Promise<void> {
    const randomCountryIndex = RandomUtil.getRandomInt(
      (await this._destinationCountryOptionsLocator.count()) - 1
    );
    const targetCountryOption = this._destinationCountryOptionsLocator.nth(randomCountryIndex);
    await targetCountryOption.click();
    await this.waitForSpinnerHidden();
    const randomCityIndex = RandomUtil.getRandomInt(
      (await this._destinationCityOptionsLocator.count()) - 1
    );
    const targetCityOption = this._destinationCityOptionsLocator.nth(randomCityIndex);
    await targetCityOption.locator(':scope + .inputs__box').click();
    await this.clickApplyButton();
  }
}
