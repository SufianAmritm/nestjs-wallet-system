import { BaseEntity } from 'src/common/database/entity/base.entity';
import { WalletTransactionReason } from 'src/modules/WalletTransactionReason/entity/walletTransactionReason.entity';
import { Wallet } from 'src/modules/wallet/entity/wallet.entity';
import { WalletTransactionCredit } from 'src/modules/walletTransactionCredit/entity/walletTransactionCredit.entity';
import { WalletTransactionDebit } from 'src/modules/walletTransactionDebit/entity/walletTransactionDebit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('wallet_transactions', { schema: 'wallet' })
export class WalletTransaction extends BaseEntity {
  @Column('integer', {
    name: 'credit_amount',
    nullable: false,
    default: 0,
  })
  creditAmount: number;
  @Column('integer', {
    name: 'debit_amount',
    nullable: false,
    default: 0,
  })
  debitAmount: number;
  @Column('boolean', { name: 'credit', nullable: false })
  credit: boolean;
  @Column('boolean', { name: 'debit', nullable: false })
  debit: boolean;
  @Column('integer', {
    name: 'opening_wallet_balance',
    nullable: false,
    default: 0,
  })
  openingWalletBalance: number;
  @Column('integer', {
    name: 'closing_wallet_balance',
    nullable: false,
    default: 0,
  })
  closingWalletBalance: number;
  @Column('integer', { name: 'wallet_id', nullable: false })
  walletId: number;
  @ManyToOne(() => Wallet, (wallet) => wallet.walletTransaction)
  @JoinColumn({ name: 'wallet_id', referencedColumnName: 'id' })
  wallet: Wallet;
  @OneToMany(
    () => WalletTransactionCredit,
    (walletTransactionCredit) => walletTransactionCredit.walletTransaction,
  )
  walletTransactionCredit: WalletTransactionCredit[];
  @OneToMany(
    () => WalletTransactionDebit,
    (walletTransactionDebit) => walletTransactionDebit.walletTransaction,
  )
  walletTransactionDebit: WalletTransactionDebit[];
  @OneToMany(
    () => WalletTransactionReason,
    (walletTransactionReason) => walletTransactionReason.walletTransaction,
  )
  WalletTransactionReason: WalletTransactionReason[];
}
