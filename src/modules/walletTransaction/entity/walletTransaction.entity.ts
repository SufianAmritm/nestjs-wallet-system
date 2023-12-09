import { BaseEntity } from 'src/common/database/entity/base.entity';
import { WalletTransactionReason } from 'src/modules/WalletTransactionReason/entity/WalletTransactionReason.entity';
import { Wallet } from 'src/modules/wallet/entity/wallet.entity';
import { WalletTransactionCredit } from 'src/modules/walletTransactionCredit/entity/walletTransactionCredit.entity';
import { WalletTransactionDebit } from 'src/modules/walletTransactionDebit/entity/walletTransactionDebit.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('wallet_transactions', { schema: 'wallet' })
export class WalletTransaction extends BaseEntity {
  @Column('integer', {
    name: 'amount',
    nullable: false,
    default: 0,
  })
  amount: number;
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
  @OneToOne(() => WalletTransactionCredit)
  walletTransactionCredit: WalletTransactionCredit;
  @OneToOne(() => WalletTransactionDebit)
  walletTransactionDebit: WalletTransactionDebit;
  @OneToOne(() => WalletTransactionReason)
  WalletTransactionReason: WalletTransactionReason;
}
