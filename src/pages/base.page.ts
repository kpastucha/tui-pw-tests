import { Locator, test } from '@playwright/test';
import { step } from '../utils/step.decorator.js';
import { BaseElement } from './base.element.js';

export abstract class BasePage extends BaseElement {
  readonly defaultLocator: Locator = this.page.locator('#page');

  async navigate(pathOrUrl: string = ''): Promise<this> {
    const baseUrl = test.info().project.use.baseURL;
    const fullUrl = baseUrl ? new URL(pathOrUrl, baseUrl).toString() : pathOrUrl;

    await test.step(`Navigating to: ${fullUrl}`, async () => await this.page.goto(pathOrUrl));

    return this;
  }

  @step('Reload page')
  async reload(): Promise<this> {
    await this.page.reload();
    return this;
  }

  @step('Close page')
  async close(): Promise<void> {
    await this.page.close();
  }
}
