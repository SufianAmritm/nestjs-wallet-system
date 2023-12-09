import { BaseRepository } from 'src/common/database/rep/base.repository';
import { WalletTransactionDebit } from '../entity/walletTransactionDebit.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionDebitSearchDto } from '../dto/walletTransactionDebitSearch.dto';
export const IWalletTransactionDebitRepository = Symbol(
  'IWalletTransactionDebitRepository',
);
export interface IWalletTransactionDebitRepository
  extends BaseRepository<WalletTransactionDebit> {
  deleteWalletTransactionDebit(id: number): Promise<DeleteResult>;
  findWalletRelationsAndSearch(
    pattern: WalletTransactionDebitSearchDto,
  ): Promise<WalletTransactionDebit[]>;
}
