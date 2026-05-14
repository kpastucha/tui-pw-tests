import { Locator, Page } from '@playwright/test';
import { step } from '../../utils/step.decorator.js';
import { AccommodationDetailsPage } from '../accommodation.details.page.js';
import { BaseComponent } from './base.component.js';

export class ResultListItemComponent extends BaseComponent {
  readonly defaultLocator: Locator;
  private readonly _continueButtonLocator: Locator;

  constructor(page: Page, parentLocator: Locator, itemLocator: Locator) {
    super(page, parentLocator);
    this.defaultLocator = itemLocator;
    this._continueButtonLocator = this.defaultLocator
      .locator('.ResultListItemV2__packagePrice')
      .getByTestId('continue-button')
      .getByRole('button');
  }

  @step('Click continue to accommodation details page')
  async continueToAccommodationDetailsPage(): Promise<AccommodationDetailsPage> {
    await this._continueButtonLocator.click();
    return await new AccommodationDetailsPage(this.page).waitForReady();
  }
}
