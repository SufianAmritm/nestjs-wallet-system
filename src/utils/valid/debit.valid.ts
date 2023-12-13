import { MESSAGE } from 'src/common/customMessages';

export function validDebit(debit: boolean, tableName: string): void {
  if (!debit) {
    throw new Error(`${MESSAGE.DEBIT_INVALID} in ${tableName}`);
  }
}
