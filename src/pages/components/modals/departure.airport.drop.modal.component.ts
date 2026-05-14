import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../data/search.field.type.js';
import { RandomUtil } from '../../../utils/random.util.js';
import { step } from '../../../utils/step.decorator.js';
import { BaseDropModalComponent } from './base.drop.modal.component.js';

export class DepartureAirportDropModalComponent extends BaseDropModalComponent {
  private readonly _airportOptionsLocator: Locator = this.defaultLocator.locator(
    '.SelectAirports__childrenGroup label'
  );

  constructor(page: Page) {
    super(page, SearchFieldType.Airport);
  }

  @step('Select random departure airport')
  async selectRandomOption(): Promise<void> {
    const randomIndex = RandomUtil.getRandomInt((await this._airportOptionsLocator.count()) - 1);
    const targetOption = this._airportOptionsLocator.nth(randomIndex);
    await targetOption.click();
    await this.clickApplyButton();
  }
}
