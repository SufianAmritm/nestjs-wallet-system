import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactionReasonController } from './walletTransactionReason.controller';
import { WalletTransactionReasonService } from './walletTransactionReason.service';

import { Module } from '@nestjs/common';
import { WalletTransactionReason } from './entity/walletTransactionReason.entity';
import { IWalletTransactionReasonRepository } from './interface/walletTransactionReasonRepo.interface';
import { WalletTransactionReasonRepository } from './repository/walletTransactionReason.repository';
const walletTransactionReasonRepositoryProvider = [
  {
    provide: IWalletTransactionReasonRepository,
    useClass: WalletTransactionReasonRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransactionReason])],
  controllers: [WalletTransactionReasonController],
  providers: [
    WalletTransactionReasonService,
    ...walletTransactionReasonRepositoryProvider,
  ],
})
export class TransactionReasonModule {}
