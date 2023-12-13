import { BaseRepository } from 'src/common/database/rep/base.repository';
import { WalletTransactionReason } from '../entity/walletTransactionReason.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionReasonSearchDto } from '../dto/walletTransactionReasonSearch.dto';
export const IWalletTransactionReasonRepository = Symbol(
  'IWalletTransactionReasonRepository',
);
export interface IWalletTransactionReasonRepository
  extends BaseRepository<WalletTransactionReason> {
  deleteWalletTransactionReason(id: number): Promise<DeleteResult>;
  findWalletTransactionReasonRelationsAndSearch(
    pattern: WalletTransactionReasonSearchDto,
  ): Promise<WalletTransactionReason[]>;
}
