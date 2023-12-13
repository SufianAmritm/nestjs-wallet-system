import { Module } from '@nestjs/common';
import { WalletTransactionCreditController } from '../walletTransactionCredit/walletTransactionCredit.controller';
import { WalletTransactionCreditService } from './walletTransactionCredit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletTransactionCredit } from './entity/walletTransactionCredit.entity';
import { IWalletTransactionCreditRepository } from './interface/walletTransactionCreditRepo.interface';
import { WalletTransactionCreditRepository } from './repository/walletTransactionCredit.repository';
import { WalletTransactionModule } from '../walletTransaction/walletTransaction.module';
const walletTransactionCreditRepositoryProvider = [
  {
    provide: IWalletTransactionCreditRepository,
    useClass: WalletTransactionCreditRepository,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature([WalletTransactionCredit]),
    WalletTransactionModule,
  ],
  controllers: [WalletTransactionCreditController],
  providers: [
    WalletTransactionCreditService,
    ...walletTransactionCreditRepositoryProvider,
  ],
})
export class WalletTransactionCreditModule {}
