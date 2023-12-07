import { CoinTransactionDebitController } from './coinTransactionDebit.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CoinTransactionDebitService } from './coinTransactionDebit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinTransactionDebit } from './entity/coinTransactionDebit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoinTransactionDebit])],
  controllers: [CoinTransactionDebitController],
  providers: [CoinTransactionDebitService],
})
export class CoinDebitModule {}
