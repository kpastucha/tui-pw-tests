import { Page } from '@playwright/test';
import { SearchFieldType } from '../../../data/search.field.type.js';
import { RandomUtil } from '../../../utils/random.util.js';
import { step } from '../../../utils/step.decorator.js';
import { BaseDropModalComponent } from './base.drop.modal.component.js';

export class RoomsAndGuestDropModalComponent extends BaseDropModalComponent {
  private readonly _adultsSelectLocator = this.defaultLocator.locator(
    '[aria-label="adult select"] select'
  );
  private readonly _childrenSelectLocator = this.defaultLocator.locator(
    '[aria-label="child select"] select'
  );
  private readonly _ageSelectLocator = this.defaultLocator.locator(
    '[aria-label="age select"] select'
  );

  constructor(page: Page) {
    super(page, SearchFieldType.RoomsAndGuest);
  }

  @step('Set ["{0}"] adults and ["{1}"] children')
  async setAdultsAndChildren(adultsCount: number, childrenCount: number): Promise<void> {
    await this._adultsSelectLocator.selectOption(adultsCount.toString());
    await this._childrenSelectLocator.selectOption(childrenCount.toString());
    if (childrenCount > 0) {
      for (let i = 0; i < childrenCount; i++) {
        const ageSelect = this._ageSelectLocator.nth(i);
        const ageOptions = await ageSelect.locator('option').all();
        const validValues: string[] = [];
        for (const option of ageOptions) {
          const value = await option.getAttribute('value');
          if (value && value !== '-1' && value !== '0') {
            validValues.push(value);
          }
        }
        const randomAgeValue = RandomUtil.getRandomElement(validValues);
        await ageSelect.selectOption(randomAgeValue);
      }
    }
    await this.clickApplyButton();
  }
}
