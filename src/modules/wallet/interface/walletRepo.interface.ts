import { BaseRepository } from 'src/common/database/rep/base.repository';
import { Wallet } from '../entity/wallet.entity';
import { DeleteResult } from 'typeorm';
import { WalletSearchDto } from '../dto/walletSearch.dto';
export const IWalletRepository = Symbol('IWalletRepository');
export interface IWalletRepository extends BaseRepository<Wallet> {
  deleteWallet(id: number): Promise<DeleteResult>;
  findWalletRelationsAndSearch(pattern: WalletSearchDto): Promise<Wallet[]>;
}
