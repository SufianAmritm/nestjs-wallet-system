export enum MESSAGE {
  MATCH_ISO = 'Value must match ISO standard',
  TITLE_CASE = 'The value must start with a capital letter.',
  NOT_FOUND = 'The item was not found',
  UPDATE_TRANSACTION_ERROR = 'Error occured during update transaction.',
  POST_TRANSACTION_ERROR = 'Error occured during post transaction.',
  EMPTY_SEARCH_QUERY = 'Must provide query params',
  INVALID_CREDIT_DEBIT = 'Credit and Debit cannot be both true or false. ',
  FOREIGN_KEY_VIOLATE = 'Foreign Key violation while posting date in the table',
  UNIQUE_VIOLATE = 'Unique key violation while posting data in table',
}
