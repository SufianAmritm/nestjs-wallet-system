import { TransactionReasonModule } from './modules/WalletTransactionReason/WalletTransactionReason.module';

import { WalletTransactionDebitModule } from './modules/walletTransactionDebit/walletTransactionDebit.module';

import { WalletTransactionCreditModule } from './modules/walletTransactionCredit/walletTransactionCredit.module';

import { CoinDebitModule } from './modules/coinTransactionDebit/coinTransactionDebit.module';
import { CoinCreditModule } from './modules/coinTransactionCredit/coinTransactionCredit.module';

import { CoinTransactionModule } from './modules/coinTransaction/coinTransaction.module';

import { WalletTransactionModule } from './modules/walletTransaction/walletTransaction.module';
import { CoinsModule } from './modules/coins/coins.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { UserModule } from './modules/user/user.module';
import { CountryModule } from './modules/country/country.module';
import { CityModule } from './modules/city/city.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './common/database/index';
import { DataSource } from 'typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionHandler } from './common/errorHandler';
import { RequestLoggerInterceptor } from './common/loggerInterceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseModule,
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options).initialize();
        return dataSource;
      },
    }),
    TransactionReasonModule,
    WalletTransactionDebitModule,
    WalletTransactionCreditModule,
    CoinDebitModule,
    CoinCreditModule,
    CoinTransactionModule,
    WalletTransactionModule,
    CoinsModule,
    WalletModule,
    UserModule,
    CountryModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
