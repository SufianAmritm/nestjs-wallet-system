/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WalletTransactionCreditController } from '../walletTransactionCredit/walletTransactionCredit.controller';
import { WalletTransactionCreditService } from './walletTransactionCredit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactionCredit } from './entity/walletTransactionCredit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransactionCredit])],
  controllers: [WalletTransactionCreditController],
  providers: [WalletTransactionCreditService],
})
export class WalletTransactionCreditModule {}
