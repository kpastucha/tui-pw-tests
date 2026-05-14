import { Locator } from '@playwright/test';
import { step } from '../../utils/step.decorator.js';
import { BaseComponent } from './base.component.js';
import { ResultListItemComponent } from './result.list.item.component.js';

export class SearchResultsListComponent extends BaseComponent {
  readonly defaultLocator: Locator = this.parentLocator.getByTestId('search-results-list');
  private readonly _itemsLocator: Locator = this.defaultLocator.getByTestId('result-item');
  private _items: ResultListItemComponent[] = [];

  @step('Get search result list item number ["{0}"]')
  async item(number: number = 1): Promise<ResultListItemComponent> {
    await this.waitForReady();
    if (number <= 0) {
      throw new Error(`Item number must be greater than 0. Received: ${number}`);
    }
    const count = await this.count();
    if (number > count) {
      throw new Error(`Cannot get item ${number}. Only ${count} items found on the list.`);
    }
    const index = number - 1;
    if (!this._items[index]) {
      this._items[index] = new ResultListItemComponent(
        this.page,
        this.defaultLocator,
        this._itemsLocator.nth(index)
      );
    }
    return this._items[index];
  }

  @step('Get all search result list items')
  async all(): Promise<ResultListItemComponent[]> {
    const count = await this.count();
    const results: ResultListItemComponent[] = [];
    for (let i = 1; i <= count; i++) {
      results.push(await this.item(i));
    }
    return results;
  }

  async count(): Promise<number> {
    return await this._itemsLocator.count();
  }
}
