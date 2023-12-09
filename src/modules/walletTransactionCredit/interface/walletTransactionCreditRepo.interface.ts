import { BaseRepository } from 'src/common/database/rep/base.repository';
import { WalletTransactionCredit } from '../entity/WalletTransactionCredit.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionCreditSearchDto } from '../dto/WalletTransactionCreditSearch.dto';
export const IWalletTransactionCreditRepository = Symbol(
  'IWalletTransactionCreditRepository',
);
export interface IWalletTransactionCreditRepository
  extends BaseRepository<WalletTransactionCredit> {
  deleteWalletTransactionCredit(id: number): Promise<DeleteResult>;
  findWalletRelationsAndSearch(
    pattern: WalletTransactionCreditSearchDto,
  ): Promise<WalletTransactionCredit[]>;
}
