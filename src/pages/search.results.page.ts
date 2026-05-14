import { BasePage } from './base.page.js';
import { SearchResultsListComponent } from './components/search.results.list.component.js';

export class SearchResultsPage extends BasePage {
  private _resultsList?: SearchResultsListComponent;

  get searchResultsListComponent(): SearchResultsListComponent {
    return (this._resultsList ??= new SearchResultsListComponent(this.page, this.defaultLocator));
  }
}
