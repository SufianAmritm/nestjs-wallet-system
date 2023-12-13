import { WalletTransaction } from '../entity/walletTransaction.entity';

export const IWalletTransactionService = Symbol('IWalletTransactionService');

export interface IWalletTransactionService {
  findOneWalletTransaction(id: number): Promise<WalletTransaction[] | void>;
}
