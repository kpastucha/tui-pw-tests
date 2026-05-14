import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../../../data/search.field.type.js';
import { step } from '../../../../../utils/step.decorator.js';
import { DestinationDropModalComponent } from '../../../modals/destination.drop.modal.component.js';
import { BaseInputDropFieldComponent } from './base.input.drop.field.component.js';

export class DestinationFieldComponent extends BaseInputDropFieldComponent {
  private _destinationDropModalComponent?: DestinationDropModalComponent;

  constructor(page: Page, parentLocator: Locator) {
    super(page, parentLocator, SearchFieldType.Destination);
  }

  private get destinationDropModalComponent(): DestinationDropModalComponent {
    return (this._destinationDropModalComponent ??= new DestinationDropModalComponent(this.page));
  }

  @step('Open destination field modal and select random option')
  async selectRandomOption(): Promise<void> {
    await this.openByIcon();
    await (await this.destinationDropModalComponent.waitForReady()).selectRandomOption();
  }
}
