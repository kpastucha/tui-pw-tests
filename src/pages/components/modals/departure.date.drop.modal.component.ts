import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../data/search.field.type.js';
import { RandomUtil } from '../../../utils/random.util.js';
import { step } from '../../../utils/step.decorator.js';
import { BaseDropModalComponent } from './base.drop.modal.component.js';

export class DepartureDateDropModalComponent extends BaseDropModalComponent {
  private readonly _availableDaysLocator: Locator = this.defaultLocator.locator(
    '.SelectLegacyDate__available'
  );

  constructor(page: Page) {
    super(page, SearchFieldType.Date);
  }

  @step('Select random available departure date')
  async selectRandomAvailableDate(): Promise<void> {
    const randomIndex = RandomUtil.getRandomInt((await this._availableDaysLocator.count()) - 1);
    const targetDay = this._availableDaysLocator.nth(randomIndex);
    await targetDay.click();
    await this.clickApplyButton();
  }
}
