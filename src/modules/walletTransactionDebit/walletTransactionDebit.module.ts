/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WalletTransactionDebitController } from './walletTransactionDebit.controller';
import { WalletTransactionDebitService } from '../walletTransactionDebit/walletTransactionDebit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactionDebit } from './entity/walletTransactionDebit.entity';
import { WalletTransactionModule } from '../walletTransaction/walletTransaction.module';
import { WalletTransactionDebitRepository } from './repository/walletTransactionDebit.repository';
import { IWalletTransactionDebitRepository } from './interface/walletTransactionDebitRepo.interface';
const walletTransactionDebitRepositoryProvider = [
  {
    provide: IWalletTransactionDebitRepository,
    useClass: WalletTransactionDebitRepository,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature([WalletTransactionDebit]),
    WalletTransactionModule,
  ],
  controllers: [WalletTransactionDebitController],
  providers: [
    WalletTransactionDebitService,
    ...walletTransactionDebitRepositoryProvider,
  ],
})
export class WalletTransactionDebitModule {}
