/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { CoinTransactionCreditController } from './coinTransactionCredit.controller';
import { CoinTransactionCreditService } from './coinTransactionCredit.service';
import { CoinTransactionCredit } from './entity/coinTransactionCredit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinTransactionModule } from '../coinTransaction/coinTransaction.module';
import { ICoinTransactionCreditRepository } from './interface/coinTransactionCreditRepo.interface';
import { CoinTransactionCreditRepository } from './repository/coinTransactionCredit.repository';
const coinTransactionCreditRepositoryProvider = [
  {
    provide: ICoinTransactionCreditRepository,
    useClass: CoinTransactionCreditRepository,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([CoinTransactionCredit]),
    CoinTransactionModule,
  ],
  controllers: [CoinTransactionCreditController],
  providers: [
    CoinTransactionCreditService,
    ...coinTransactionCreditRepositoryProvider,
  ],
  exports: [],
})
export class CoinCreditModule {}
