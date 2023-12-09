import { CoinTransaction } from '../entity/coinTransaction.entity';

export const ICoinTransactionService = Symbol('ICoinTransactionService');

export interface ICoinTransactionService {
  findOneCoinTransaction(id: number): Promise<CoinTransaction[] | void>;
}
