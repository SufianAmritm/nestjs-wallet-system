import { MESSAGE } from 'src/common/customMessages/index';
import { WalletTransactionDto } from 'src/modules/walletTransaction/dto/walletTransaction.dto';
export function validateWalletTransaction(body: WalletTransactionDto): void {
  const { credit, debit, creditAmount, debitAmount } = body;

  if (!debit && !credit) {
    throw new Error(MESSAGE.INVALID_CREDIT_DEBIT);
  }
  if (
    (creditAmount === undefined || null) &&
    (debitAmount === undefined || null)
  ) {
    throw new Error(MESSAGE.INVALID_TRANSACTION);
  }
  if ((credit && debitAmount && !debit) || (debit && creditAmount && !credit)) {
    throw new Error(MESSAGE.INVALID_TRANSACTION_AMOUNT);
  }
  return;
}
