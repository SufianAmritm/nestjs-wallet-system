import { CoinTransactionDebit } from 'src/modules/coinTransactionDebit/entity/coinTransactionDebit.entity';
import { WalletTransactionDebit } from 'src/modules/walletTransactionDebit/entity/walletTransactionDebit.entity';

export function debitInputValidation(
  data: WalletTransactionDebit | CoinTransactionDebit,
): void {
  const checkArray: string[] = [];

  for (const i in data) {
    if (data[i] === true) {
      console.log(i);
      checkArray.push(i);
    }
  }
  console.log(checkArray);
  if (checkArray.length > 1) {
    throw new Error('Only one debit can be true');
  }
  if (checkArray.length === 0) {
    throw new Error('At least one debit must be true');
  }
}
