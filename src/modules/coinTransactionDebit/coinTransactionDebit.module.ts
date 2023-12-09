import { CoinTransactionDebitController } from './coinTransactionDebit.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CoinTransactionDebitService } from './coinTransactionDebit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinTransactionDebit } from './entity/coinTransactionDebit.entity';
import { CoinTransactionModule } from '../coinTransaction/coinTransaction.module';
import { ICoinTransactionDebitRepository } from './interface/coinTransactionDebitRepo.interface';
import { CoinTransactionDebitRepository } from './repository/coinTransactionDebit.repository';
const coinTransactionDebitRepositoryProvider = [
  {
    provide: ICoinTransactionDebitRepository,
    useClass: CoinTransactionDebitRepository,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature([CoinTransactionDebit]),
    CoinTransactionModule,
  ],
  controllers: [CoinTransactionDebitController],
  providers: [
    CoinTransactionDebitService,
    ...coinTransactionDebitRepositoryProvider,
  ],
})
export class CoinDebitModule {}
