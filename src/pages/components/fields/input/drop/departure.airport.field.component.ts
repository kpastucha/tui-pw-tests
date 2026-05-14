import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../../../data/search.field.type.js';
import { step } from '../../../../../utils/step.decorator.js';
import { DepartureAirportDropModalComponent } from '../../../modals/departure.airport.drop.modal.component.js';
import { BaseInputDropFieldComponent } from './base.input.drop.field.component.js';

export class DepartureAirportFieldComponent extends BaseInputDropFieldComponent {
  private _departureAirportDropModalComponent?: DepartureAirportDropModalComponent;

  constructor(page: Page, parentLocator: Locator) {
    super(page, parentLocator, SearchFieldType.Airport);
  }

  private get departureAirportDropModalComponent(): DepartureAirportDropModalComponent {
    return (this._departureAirportDropModalComponent ??= new DepartureAirportDropModalComponent(
      this.page
    ));
  }

  @step('Open departure airport and select random option')
  async selectRandomOption(): Promise<void> {
    await this.open();
    await (await this.departureAirportDropModalComponent.waitForReady()).selectRandomOption();
  }
}
