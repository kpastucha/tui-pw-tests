import { Locator, Page } from '@playwright/test';
import { InputFieldType } from '../../../../data/input.field.type.js';
import { BaseInputFieldComponent } from './base.input.field.component.js';

export class EmergencyContactInputFieldComponent extends BaseInputFieldComponent {
  readonly defaultLocator: Locator;

  constructor(page: Page, parentLocator: Locator, passengerFieldType: InputFieldType) {
    super(page, parentLocator);
    const emergencyContainer = this.parentLocator.locator('.EmergencyContact__passengerContainer');
    this.defaultLocator = emergencyContainer.locator(
      `div[class*="__inputTextBox"]:not([class*="CheckboxField__"])[aria-label="${passengerFieldType.name}"]`
    );
  }
}
