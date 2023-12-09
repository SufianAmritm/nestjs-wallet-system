/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CoinTransactionController } from './coinTransaction.controller';
import { CoinTransactionService } from './coinTransaction.service';
import { CoinTransaction } from './entity/coinTransaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinsModule } from '../coins/coins.module';

import { ICoinTransactionRepository } from './interface/coinTransactionRepo.interface';
import { CoinTransactionRepository } from './repository/coinTransaction.repository';
const coinTransactionRepositoryProvider = [
  {
    provide: ICoinTransactionRepository,
    useClass: CoinTransactionRepository,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([CoinTransaction]), CoinsModule],
  controllers: [CoinTransactionController],
  providers: [CoinTransactionService, ...coinTransactionRepositoryProvider],
})
export class CoinTransactionModule {}
