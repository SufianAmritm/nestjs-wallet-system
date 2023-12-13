import { WalletTransactionController } from './walletTransaction.controller';

import { Module } from '@nestjs/common';
import { WalletTransactionService } from '../walletTransaction/walletTransaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransaction } from './entity/walletTransaction.entity';
import { WalletModule } from '../wallet/wallet.module';
import { IWalletTransactionRepository } from './interface/walletTransactionRepo.interface';
import { WalletTransactionRepository } from './repository/walletTransaction.repository';
import { IWalletTransactionService } from './interface/walletTransactionService.interface';
const walletTransactionRepositoryProvider = [
  {
    provide: IWalletTransactionRepository,
    useClass: WalletTransactionRepository,
  },
];
const walletTransactionServiceProvider = [
  {
    provide: IWalletTransactionService,
    useClass: WalletTransactionService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([WalletTransaction]), WalletModule],
  controllers: [WalletTransactionController],
  providers: [
    WalletTransactionService,
    ...walletTransactionRepositoryProvider,

    ...walletTransactionServiceProvider,
  ],
  exports: [
    ...walletTransactionRepositoryProvider,
    ...walletTransactionServiceProvider,
  ],
})
export class WalletTransactionModule {}
