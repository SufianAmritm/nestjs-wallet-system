import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactionReasonController } from './WalletTransactionReason.controller';
import { WalletTransactionReasonService } from './WalletTransactionReason.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WalletTransactionReason } from './entity/WalletTransactionReason.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransactionReason])],
  controllers: [WalletTransactionReasonController],
  providers: [WalletTransactionReasonService],
})
export class TransactionReasonModule {}
