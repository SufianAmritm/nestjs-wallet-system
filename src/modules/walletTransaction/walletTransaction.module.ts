import { WalletTransactionController } from './walletTransaction.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WalletTransactionService } from '../walletTransaction/walletTransaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransaction } from './entity/walletTransaction';

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransaction])],
  controllers: [WalletTransactionController],
  providers: [WalletTransactionService],
})
export class WalletTransactionModule {}
