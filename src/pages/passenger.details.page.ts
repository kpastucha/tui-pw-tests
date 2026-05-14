import { Locator } from '@playwright/test';
import { InputFieldType } from '../data/input.field.type.js';
import { AssertionUtil } from '../utils/assertion.util.js';
import { BasePage } from './base.page.js';
import { EmergencyContactInputFieldComponent } from './components/fields/input/emergency.contact.input.field.component.js';
import { PassengerInputFieldComponent } from './components/fields/input/passenger.input.field.component.js';

export class PassengerDetailsPage extends BasePage {
  private readonly _passengerFormFieldsLocator: Locator = this.defaultLocator.locator(
    '#passengerFormFields__component form'
  );
  private readonly _firstChildrenHeaderLocator: Locator =
    this.defaultLocator.locator('h3:has-text("Kind 1")');
  private readonly _continueToPaymentButtonLocator: Locator = this.defaultLocator.locator(
    '#PassengerV2ContinueButton__component button'
  );
  private readonly _emergencyContactLastNameField: EmergencyContactInputFieldComponent =
    new EmergencyContactInputFieldComponent(
      this.page,
      this.defaultLocator,
      InputFieldType.LastName
    );
  private readonly _emergencyContactMobilePhoneNumberField: EmergencyContactInputFieldComponent =
    new EmergencyContactInputFieldComponent(
      this.page,
      this.defaultLocator,
      InputFieldType.MobilePhoneNumber
    );
  private readonly _passengerFirstNameField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.FirstName
    );
  private readonly _passengerLastNameField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.LastName
    );
  private readonly _passengerDateOfBirthField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.DateOfBirth
    );
  private readonly _passengerStreetNameField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.StreetName
    );
  private readonly _passengerHouseNumberField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.HouseNumber
    );
  private readonly _passengerPostCodeField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.Postcode
    );
  private readonly _passengerPlaceOfResidenceField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.PlaceOfResidence
    );
  private readonly _passengerMobilePhoneNumberField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.MobilePhoneNumber
    );
  private readonly _passengerEmailAddressField = (
    passengerNumber: number
  ): PassengerInputFieldComponent =>
    new PassengerInputFieldComponent(
      this.page,
      this.defaultLocator,
      passengerNumber,
      InputFieldType.EmailAddress
    );

  async clickContinueToPayment(): Promise<void> {
    await this._continueToPaymentButtonLocator.click();
  }

  async fillPassengerFormFieldsWithInvalidData(passengerNumber: number = 1): Promise<void> {
    await this._passengerFirstNameField(passengerNumber).fillInput('1');
    await this._passengerLastNameField(passengerNumber).fillInput('2');
    await this._passengerDateOfBirthField(passengerNumber).fillDate('3', '4', '5');
    if (passengerNumber === 1) {
      await this._passengerStreetNameField(passengerNumber).fillInput('a');
      await this._passengerHouseNumberField(passengerNumber).fillInput('#');
      await this._passengerPostCodeField(passengerNumber).fillInput('b');
      await this._passengerPlaceOfResidenceField(passengerNumber).fillInput('c');
      await this._passengerMobilePhoneNumberField(passengerNumber).fillInput('d');
      await this._passengerEmailAddressField(passengerNumber).fillInput('e');
    }
  }

  async fillEmergencyContactFormFieldsWithInvalidData() {
    await this._emergencyContactLastNameField.fillInput('1');
    await this._emergencyContactMobilePhoneNumberField.fillInput('a');
  }

  async assertPassengerFormFields(screenshotName: string) {
    await AssertionUtil.assertMaskedScreenshot(
      this._passengerFormFieldsLocator,
      screenshotName,
      this._firstChildrenHeaderLocator
    );
  }
}
