import { Locator } from '@playwright/test';
import { BaseComponent } from './base.component.js';
import { PricePanelComponent } from './price.panel.component.js';

export class ProgressBarNavigationComponent extends BaseComponent {
  readonly defaultLocator: Locator = this.parentLocator.locator(
    '#progressBarNavigation__component'
  );
  private _pricePanelComponent?: PricePanelComponent;

  get pricePanelComponent(): PricePanelComponent {
    return (this._pricePanelComponent ??= new PricePanelComponent(this.page, this.defaultLocator));
  }
}
