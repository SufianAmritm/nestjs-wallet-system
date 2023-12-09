import { WalletTransactionController } from './walletTransaction.controller';

import { Module } from '@nestjs/common';
import { WalletTransactionService } from '../walletTransaction/walletTransaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransaction } from './entity/walletTransaction.entity';
import { WalletModule, walletServiceProvider } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { IWalletTransactionRepository } from './interface/walletTransactionRepo.interface';
import { WalletTransactionRepository } from './repository/walletTransaction.repository';
const walletTransactionRepositoryProvider = [
  {
    provide: IWalletTransactionRepository,
    useClass: WalletTransactionRepository,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([WalletTransaction]), WalletModule],
  controllers: [WalletTransactionController],
  providers: [
    WalletTransactionService,
    ...walletTransactionRepositoryProvider,
    ...walletServiceProvider,
  ],
})
export class WalletTransactionModule {}
