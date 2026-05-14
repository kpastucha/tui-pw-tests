import { Locator } from '@playwright/test';
import { step } from '../../utils/step.decorator.js';
import { SearchResultsPage } from '../search.results.page.js';
import { BaseComponent } from './base.component.js';
import { DepartureAirportFieldComponent } from './fields/input/drop/departure.airport.field.component.js';
import { DepartureDateFieldComponent } from './fields/input/drop/departure.date.field.component.js';
import { DestinationFieldComponent } from './fields/input/drop/destination.field.component.js';
import { RoomsAndGuestFieldComponent } from './fields/input/drop/rooms.and.guest.field.component.js';

export class SearchComponent extends BaseComponent {
  readonly defaultLocator: Locator = this.parentLocator.locator('#choiceSearch__component');
  private _departureAirportFieldComponent?: DepartureAirportFieldComponent;
  private _destinationFieldComponent?: DestinationFieldComponent;
  private _departureDateFieldComponent?: DepartureDateFieldComponent;
  private _roomsAndGuestFieldComponent?: RoomsAndGuestFieldComponent;
  private readonly _searchButtonLocator = this.defaultLocator.getByTestId('search-button');

  get departureAirportFieldComponent(): DepartureAirportFieldComponent {
    return (this._departureAirportFieldComponent ??= new DepartureAirportFieldComponent(
      this.page,
      this.defaultLocator
    ));
  }

  get destinationFieldComponent(): DestinationFieldComponent {
    return (this._destinationFieldComponent ??= new DestinationFieldComponent(
      this.page,
      this.defaultLocator
    ));
  }

  get departureDateFieldComponent(): DepartureDateFieldComponent {
    return (this._departureDateFieldComponent ??= new DepartureDateFieldComponent(
      this.page,
      this.defaultLocator
    ));
  }

  get roomsAndGuestFieldComponent(): RoomsAndGuestFieldComponent {
    return (this._roomsAndGuestFieldComponent ??= new RoomsAndGuestFieldComponent(
      this.page,
      this.defaultLocator
    ));
  }

  @step('Perform search')
  async performSearch(): Promise<SearchResultsPage> {
    await this._searchButtonLocator.click();
    return await new SearchResultsPage(this.page).waitForReady();
  }
}
