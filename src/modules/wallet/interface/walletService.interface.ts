import { UpdateResult } from 'typeorm';
import { WalletUpdateDto } from '../dto/walletUpdate.dto';
import { Wallet } from '../entity/wallet.entity';
export const IWalletService = Symbol('IWalletService');

export interface IWalletService {
  findOneWallet(id: number): Promise<Wallet[] | void>;

  updateWalletWithTransaction(
    id: number,
    wallet: WalletUpdateDto,
  ): Promise<UpdateResult>;
}
