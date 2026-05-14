import { Page, test } from '@playwright/test';
import { Tag } from '../../../../src/data/tag.js';
import { HomePage } from '../../../../src/pages/home.page.js';
import { PassengerDetailsPage } from '../../../../src/pages/passenger.details.page.js';

test.describe(
  `Booking summary passenger details tests`,
  { tag: [Tag.Functional, Tag.Regression, Tag.Visual] },
  () => {
    let page: Page;
    let passengerDetailsPage: PassengerDetailsPage;

    test.beforeAll('Setup passenger details page', async ({ browser }) => {
      page = await browser.newPage();
      const searchComponent = (await new HomePage(page).navigate()).searchComponent;
      await searchComponent.departureAirportFieldComponent.selectRandomOption();
      await searchComponent.destinationFieldComponent.selectRandomOption();
      await searchComponent.departureDateFieldComponent.selectRandomAvailableDate();
      await searchComponent.roomsAndGuestFieldComponent.setAdultsAndChildren(2, 1);
      const searchResultsPage = await searchComponent.performSearch();
      const hotelItem = await searchResultsPage.searchResultsListComponent.item();
      const accommodationPage = await hotelItem.continueToAccommodationDetailsPage();
      const customisePage =
        await accommodationPage.progressBarNavigationComponent.pricePanelComponent.continueToCustomiseHolidayPage();
      passengerDetailsPage =
        await customisePage.progressBarNavigationComponent.pricePanelComponent.continueToPassengerDetailsPage();
    });

    test.afterEach(
      'Reload passenger details page',
      async () => await passengerDetailsPage.reload()
    );

    test.afterAll('Close shared page', async () => await page.close());

    test('Should display passenger details page initial state', async () =>
      await passengerDetailsPage.assertPassengerFormFields('passenger-details-page-initial-stat'));

    test('Should display passenger details page error messages for empty fields', async () => {
      await passengerDetailsPage.clickContinueToPayment();
      await passengerDetailsPage.assertPassengerFormFields(
        'passenger-details-page-errors-empty-fields'
      );
    });

    test('Should display passenger details page error messages for invalid fields inputs', async () => {
      await passengerDetailsPage.fillPassengerFormFieldsWithInvalidData();
      await passengerDetailsPage.fillPassengerFormFieldsWithInvalidData(2);
      await passengerDetailsPage.fillPassengerFormFieldsWithInvalidData(3);
      await passengerDetailsPage.fillEmergencyContactFormFieldsWithInvalidData();
      await passengerDetailsPage.clickDefaultLocator();
      await passengerDetailsPage.assertPassengerFormFields(
        'passenger-details-page-errors-invalid-fields-inputs'
      );
    });
  }
);
