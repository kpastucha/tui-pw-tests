import { Locator, Page } from '@playwright/test';
import { InputFieldType } from '../../../../data/input.field.type.js';
import { BaseInputFieldComponent } from './base.input.field.component.js';

export class PassengerInputFieldComponent extends BaseInputFieldComponent {
  readonly defaultLocator: Locator;

  constructor(
    page: Page,
    parentLocator: Locator,
    passengerNumber: number,
    passengerFieldType: InputFieldType
  ) {
    super(page, parentLocator);
    const passengerContainer = this.parentLocator
      .locator('.PassengerFormV2__passengerContainer')
      .nth(passengerNumber - 1);
    this.defaultLocator = passengerContainer.locator(
      `div[class*="__inputTextBox"]:not([class*="CheckboxField__"])[aria-label="${passengerFieldType.name}"]`
    );
  }
}
