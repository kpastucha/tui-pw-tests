import { Locator, Page } from '@playwright/test';
import { step } from '../../../../utils/step.decorator.js';
import { BaseComponent } from '../../base.component.js';

export abstract class BaseInputFieldComponent extends BaseComponent {
  constructor(page: Page, parentLocator: Locator) {
    super(page, parentLocator);
  }

  get inputLocator(): Locator {
    return this.defaultLocator.locator('input:not([type="hidden"])');
  }

  @step('Fill input with "{0}"')
  async fillInput(value: string): Promise<void> {
    await this.inputLocator.fill(value);
  }

  @step('Fill date with: day "{0}", month "{1}", year "{2}"')
  async fillDate(day: string, month: string, year: string): Promise<void> {
    await this.defaultLocator.getByRole('textbox', { name: 'day' }).fill(day);
    await this.defaultLocator.getByRole('textbox', { name: 'month' }).fill(month);
    await this.defaultLocator.getByRole('textbox', { name: 'year' }).fill(year);
  }
}
