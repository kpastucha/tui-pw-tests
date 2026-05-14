import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../../../data/search.field.type.js';
import { step } from '../../../../../utils/step.decorator.js';
import { DepartureDateDropModalComponent } from '../../../modals/departure.date.drop.modal.component.js';
import { BaseInputDropFieldComponent } from './base.input.drop.field.component.js';

export class DepartureDateFieldComponent extends BaseInputDropFieldComponent {
  private _departureDateDropModalComponent?: DepartureDateDropModalComponent;

  constructor(page: Page, parentLocator: Locator) {
    super(page, parentLocator, SearchFieldType.Date);
  }

  private get departureDateDropModalComponent(): DepartureDateDropModalComponent {
    return (this._departureDateDropModalComponent ??= new DepartureDateDropModalComponent(
      this.page
    ));
  }

  @step('Open departure date field modal and select random available date')
  async selectRandomAvailableDate(): Promise<void> {
    await this.open();
    await (await this.departureDateDropModalComponent.waitForReady()).selectRandomAvailableDate();
  }
}
