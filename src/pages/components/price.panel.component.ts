import { Locator } from '@playwright/test';
import { step } from '../../utils/step.decorator.js';
import { CustomiseHolidayPage } from '../customise.holiday.page.js';
import { PassengerDetailsPage } from '../passenger.details.page.js';
import { BaseComponent } from './base.component.js';

export class PricePanelComponent extends BaseComponent {
  readonly defaultLocator: Locator = this.parentLocator.locator(
    '.ProgressbarNavigation__pricePanelWrapper'
  );
  private readonly _continueButtonLocator = (text: string): Locator =>
    this.defaultLocator.getByRole('button').filter({ hasText: text });

  @step('Continue to customise holiday page')
  async continueToCustomiseHolidayPage(): Promise<CustomiseHolidayPage> {
    await this.clickContinueButton('Verder');
    return await new CustomiseHolidayPage(this.page).waitForReady();
  }

  @step('Continue to passenger details page')
  async continueToPassengerDetailsPage(): Promise<PassengerDetailsPage> {
    await this.clickContinueButton('Boek Nu');
    return await new PassengerDetailsPage(this.page).waitForReady();
  }

  @step('Click continue button')
  private async clickContinueButton(text: string) {
    await this._continueButtonLocator(text).click();
  }
}
