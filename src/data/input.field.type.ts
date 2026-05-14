export const InputFieldType = {
  DateOfBirth: { name: 'Geboortedatum' },
  EmailAddress: { name: 'E-mailadres' },
  FirstName: { name: 'Eerste voornaam' },
  HouseNumber: { name: 'Huisnummer' },
  LastName: { name: 'Achternaam' },
  MobilePhoneNumber: { name: 'Mobiel telefoonnummer' },
  PlaceOfResidence: { name: 'Woonplaats' },
  Postcode: { name: 'Postcode' },
  StreetName: { name: 'Straatnaam' }
} as const;

export type InputFieldType = (typeof InputFieldType)[keyof typeof InputFieldType];
