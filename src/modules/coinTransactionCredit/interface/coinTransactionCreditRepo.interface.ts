import { BaseRepository } from 'src/common/database/rep/base.repository';
import { CoinTransactionCredit } from '../entity/coinTransactionCredit.entity';
import { DeleteResult } from 'typeorm';
import { CoinTransactionCreditSearchDto } from '../dto/coinTransactionCreditSearch.dto';
export const ICoinTransactionCreditRepository = Symbol(
  'ICoinTransactionCreditRepository',
);
export interface ICoinTransactionCreditRepository
  extends BaseRepository<CoinTransactionCredit> {
  deleteCoinTransactionCredit(id: number): Promise<DeleteResult>;
  findCoinRelationsAndSearch(
    pattern: CoinTransactionCreditSearchDto,
  ): Promise<CoinTransactionCredit[]>;
}
