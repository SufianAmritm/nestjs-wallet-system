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
  CREDIT_INVALID = 'The transaction is not credit type. Recheck if it is credit or debit type.',
  DEBIT_INVALID = 'The transaction is not debit type. Recheck if it is credit or debit type.',
  INVALID_TRANSACTION = 'The transaction must have both or one of credit and debit amounts',
  INVALID_TRANSACTION_AMOUNT = 'The transaction must have matching amounts with its type for example credit:true-->creditAmount && !debitAmount',
  USER_CSV_INVALID_IDS = 'No invalid ids. Data updated Successfully',
  INVALID_FILE_SIZE = 'File size must be less than 100b',
  INVALID_FILE = 'File is not valid. Provide all values',
}

export enum OPERATION {
  ADD = 'add',
  UPDATE = 'update',
}
export enum USER_CSV {
  USERID = 'id',
  USERNAME = 'name',
  USERCITYID = 'cityId',
}
