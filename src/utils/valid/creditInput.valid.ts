import { CoinTransactionCredit } from 'src/modules/coinTransactionCredit/entity/coinTransactionCredit.entity';
import { WalletTransactionCredit } from 'src/modules/walletTransactionCredit/entity/walletTransactionCredit.entity';

export function creditInputValidation(
  data: WalletTransactionCredit | CoinTransactionCredit,
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
    throw new Error('Only one credit can be true');
  }
  if (checkArray.length === 0) {
    throw new Error('At least one credit must be true');
  }
}
