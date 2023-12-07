/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { CoinTransactionCreditController } from './coinTransactionCredit.controller';
import { CoinTransactionCreditService } from './coinTransactionCredit.service';
import { CoinTransactionCredit } from './entity/coinTransactionCredit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CoinTransactionCredit])],
  controllers: [CoinTransactionCreditController],
  providers: [CoinTransactionCreditService],
})
export class CoinCreditModule {}
