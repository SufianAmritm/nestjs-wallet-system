import { MESSAGE } from 'src/common/customMessages';

export function validCredit(credit: boolean, tableName: string): void {
  if (!credit) {
    throw new Error(`${MESSAGE.CREDIT_INVALID} in ${tableName}`);
  }
}
