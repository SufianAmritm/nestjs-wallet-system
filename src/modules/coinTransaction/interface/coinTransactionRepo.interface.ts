import { BaseRepository } from 'src/common/database/rep/base.repository';
import { CoinTransaction } from '../entity/coinTransaction.entity';
import { DeleteResult } from 'typeorm';
import { CoinTransactionSearchDto } from '../dto/coinTransactionSearch.dto';
export const ICoinTransactionRepository = Symbol('ICoinTransactionRepository');
export interface ICoinTransactionRepository
  extends BaseRepository<CoinTransaction> {
  deleteCoinTransaction(id: number): Promise<DeleteResult>;
  findCoinsRelationsAndSearch(
    pattern: CoinTransactionSearchDto,
  ): Promise<CoinTransaction[]>;
}
