/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entity/wallet.entity';
import { WalletRepository } from './repository/wallet.repository';
import { IWalletRepository } from './interface/walletRepo.interface';
import { IWalletService } from './interface/walletService.interface';
const walletRepositoryProvider = [
  { provide: IWalletRepository, useClass: WalletRepository },
];
const walletServiceProvider = [
  { provide: IWalletService, useClass: WalletService },
];
@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [
    WalletService,
    ...walletRepositoryProvider,
    ...walletServiceProvider,
  ],
  exports: [...walletRepositoryProvider, ...walletServiceProvider],
})
export class WalletModule {}
