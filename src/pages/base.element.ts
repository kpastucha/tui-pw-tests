import { Locator, Page } from '@playwright/test';
import { step } from '../utils/step.decorator.js';

export abstract class BaseElement {
  abstract readonly defaultLocator: Locator;

  constructor(protected readonly page: Page) {}

  @step('Wait for default locator')
  async waitForReady(): Promise<this> {
    await this.defaultLocator.waitFor();
    return this;
  }

  @step('Click default locator')
  async clickDefaultLocator(): Promise<void> {
    await this.defaultLocator.click();
  }
}
