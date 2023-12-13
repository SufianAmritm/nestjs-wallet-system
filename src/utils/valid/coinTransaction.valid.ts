import { CoinTransactionDto } from 'src/modules/coinTransaction/dto/coinTransaction.dto';
import { MESSAGE } from 'src/common/customMessages/index';
export function validateCoinTransaction(body: CoinTransactionDto): void {
  const { credit, debit, creditAmount, debitAmount } = body;

  if (!debit && !credit) {
    throw new Error(MESSAGE.INVALID_CREDIT_DEBIT);
  }
  if (
    creditAmount === undefined ||
    (null && debitAmount === undefined) ||
    null
  ) {
    throw new Error(MESSAGE.INVALID_TRANSACTION_AMOUNT);
  }
  if ((credit && debitAmount && !debit) || (debit && creditAmount && !credit)) {
    throw new Error(MESSAGE.INVALID_TRANSACTION_AMOUNT);
  }
  return;
}
