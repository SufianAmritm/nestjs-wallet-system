/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WalletTransactionDebitController } from './walletTransactionDebit.controller';
import { WalletTransactionDebitService } from '../walletTransactionDebit/walletTransactionDebit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactionDebit } from './entity/walletTransactionDebit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransactionDebit])],
  controllers: [WalletTransactionDebitController],
  providers: [WalletTransactionDebitService],
})
export class WalletTransactionDebitModule {}
