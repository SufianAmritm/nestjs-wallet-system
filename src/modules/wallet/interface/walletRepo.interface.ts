import { BaseRepository } from 'src/common/database/rep/base.repository';
import { Wallet } from '../entity/wallet.entity';
import { DeleteResult } from 'typeorm';
import { WalletSearchDto } from '../dto/walletSearch.dto';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction.entity';
export const IWalletRepository = Symbol('IWalletRepository');
export interface IWalletRepository extends BaseRepository<Wallet> {
  deleteWallet(id: number): Promise<DeleteResult>;
  findWalletRelationsAndSearch(
    pattern: WalletSearchDto,
    walletTransactions: boolean,
  ): Promise<Wallet[] | WalletTransaction[]>;
}
