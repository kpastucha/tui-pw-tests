import { Locator, Page } from '@playwright/test';
import { SearchFieldType } from '../../../../../data/search.field.type.js';
import { step } from '../../../../../utils/step.decorator.js';
import { RoomsAndGuestDropModalComponent } from '../../../modals/rooms.and.guest.drop.modal.component.js';
import { BaseInputDropFieldComponent } from './base.input.drop.field.component.js';

export class RoomsAndGuestFieldComponent extends BaseInputDropFieldComponent {
  private _roomsAndGuestDropModalComponent?: RoomsAndGuestDropModalComponent;

  constructor(page: Page, parentLocator: Locator) {
    super(page, parentLocator, SearchFieldType.RoomsAndGuest);
  }

  private get roomsAndGuestDropModalComponent(): RoomsAndGuestDropModalComponent {
    return (this._roomsAndGuestDropModalComponent ??= new RoomsAndGuestDropModalComponent(
      this.page
    ));
  }

  @step('Open rooms and guest field modal and set adults and children')
  async setAdultsAndChildren(adults: number, children: number): Promise<void> {
    await this.open();
    await (
      await this.roomsAndGuestDropModalComponent.waitForReady()
    ).setAdultsAndChildren(adults, children);
  }
}
