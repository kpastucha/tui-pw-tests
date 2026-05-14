import { BasePage } from './base.page.js';
import { SearchComponent } from './components/search.component.js';

export class HomePage extends BasePage {
  private _searchComponent?: SearchComponent;

  override async navigate(): Promise<this> {
    await super.navigate();
    return this;
  }

  get searchComponent(): SearchComponent {
    return (this._searchComponent ??= new SearchComponent(this.page, this.defaultLocator));
  }
}
