import { BaseRepository } from 'src/common/database/rep/base.repository';
import { CoinTransactionDebit } from '../entity/coinTransactionDebit.entity';
import { DeleteResult } from 'typeorm';
import { CoinTransactionDebitSearchDto } from '../dto/coinTransactionDebitSearch.dto';
export const ICoinTransactionDebitRepository = Symbol(
  'ICoinTransactionDebitRepository',
);
export interface ICoinTransactionDebitRepository
  extends BaseRepository<CoinTransactionDebit> {
  deleteCoinTransactionDebit(id: number): Promise<DeleteResult>;
  findCoinRelationsAndSearch(
    pattern: CoinTransactionDebitSearchDto,
  ): Promise<CoinTransactionDebit[]>;
}
