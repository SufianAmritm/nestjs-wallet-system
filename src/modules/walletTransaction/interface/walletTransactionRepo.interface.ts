import { BaseRepository } from 'src/common/database/rep/base.repository';
import { WalletTransaction } from '../entity/walletTransaction.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionSearchDto } from '../dto/walletTransactionSearch.dto';
export const IWalletTransactionRepository = Symbol(
  'IWalletTransactionRepository',
);
export interface IWalletTransactionRepository
  extends BaseRepository<WalletTransaction> {
  deleteWalletTransaction(id: number): Promise<DeleteResult>;
  findWalletRelationsAndSearch(
    pattern: WalletTransactionSearchDto,
  ): Promise<WalletTransaction[]>;
}
