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
import { ICoinTransactionService } from './interface/coinTransactionService.interface';
const coinTransactionRepositoryProvider = [
  {
    provide: ICoinTransactionRepository,
    useClass: CoinTransactionRepository,
  },
];
const coinTransactionServiceProvider = [
  {
    provide: ICoinTransactionService,
    useClass: CoinTransactionService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([CoinTransaction]), CoinsModule],
  controllers: [CoinTransactionController],
  providers: [
    CoinTransactionService,
    ...coinTransactionRepositoryProvider,
    ...coinTransactionServiceProvider,
  ],
  exports: [
    ...coinTransactionRepositoryProvider,
    ...coinTransactionServiceProvider,
  ],
})
export class CoinTransactionModule {}
