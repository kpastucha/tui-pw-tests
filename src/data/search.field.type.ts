interface SearchFieldConfig {
  field: string;
  modal: string;
}

const createField = (field: string, modal?: string): SearchFieldConfig => ({
  field,
  modal: modal ?? field
});

export const SearchFieldType = {
  Airport: createField('airports'),
  Date: createField('date'),
  Destination: createField('destinations'),
  RoomsAndGuest: createField('passengers', 'room and guest')
} as const;

export type SearchFieldType = (typeof SearchFieldType)[keyof typeof SearchFieldType];
