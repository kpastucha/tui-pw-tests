import { Locator, Page } from '@playwright/test';
import { BaseElement } from '../base.element.js';

export abstract class BaseComponent extends BaseElement {
  constructor(
    page: Page,
    protected readonly parentLocator: Locator
  ) {
    super(page);
  }
}
