import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../../../data/search.field.type.js';
import { step } from '../../../../../utils/step.decorator.js';
import { BaseInputFieldComponent } from '../base.input.field.component.js';

export abstract class BaseInputDropFieldComponent extends BaseInputFieldComponent {
  readonly defaultLocator: Locator;
  private readonly inputChildrenLocator: Locator;

  constructor(page: Page, parentLocator: Locator, fieldType: SearchFieldType) {
    super(page, parentLocator);
    this.defaultLocator = this.parentLocator.locator(`.Package__${fieldType.field}`);
    this.inputChildrenLocator = this.defaultLocator.locator('.inputs__children');
  }

  @step('Open input field modal')
  async open(): Promise<void> {
    await this.inputLocator.click();
  }

  @step('Open input filed modal by icon')
  async openByIcon(): Promise<void> {
    await this.inputChildrenLocator.click();
  }
}
