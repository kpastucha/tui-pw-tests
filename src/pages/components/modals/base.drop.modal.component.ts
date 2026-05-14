import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../data/search.field.type.js';
import { step } from '../../../utils/step.decorator.js';
import { BaseComponent } from '../base.component.js';

export abstract class BaseDropModalComponent extends BaseComponent {
  readonly defaultLocator: Locator;
  private readonly applyButtonLocator: Locator;
  private readonly spinnerLocator: Locator;

  constructor(page: Page, fieldType: SearchFieldType) {
    super(page, page.locator('body'));
    this.defaultLocator = this.parentLocator.getByRole('region', { name: fieldType.modal });
    this.applyButtonLocator = this.defaultLocator.getByRole('button');
    this.spinnerLocator = this.defaultLocator.locator('.WaitingSpinner__spinnerWrapper');
  }

  @step('Click apply button')
  protected async clickApplyButton(): Promise<void> {
    await this.applyButtonLocator.click();
  }

  @step('Wait for spinner hidden')
  protected async waitForSpinnerHidden(): Promise<void> {
    await this.spinnerLocator.waitFor({ state: 'hidden' });
  }

  override async waitForReady(): Promise<this> {
    await super.waitForReady();
    await this.waitForSpinnerHidden();
    return this;
  }
}
