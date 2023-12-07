/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CoinTransactionController } from './coinTransaction.controller';
import { CoinTransactionService } from './coinTransaction.service';
import { CoinTransaction } from './entity/coinTransaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([CoinTransaction])],
  controllers: [CoinTransactionController],
  providers: [CoinTransactionService],
})
export class CoinTransactionModule {}
