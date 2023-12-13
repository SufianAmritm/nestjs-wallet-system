import { BaseEntity } from 'src/common/database/entity/base.entity';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('wallet_transaction_debit', { schema: 'wallet' })
export class WalletTransactionDebit extends BaseEntity {
  @Column('integer', { name: 'amount', nullable: false })
  amount: number;
  @Column('boolean', {
    name: 'usage_at_checkout',
    nullable: false,
    default: false,
  })
  usageAtCheckout: boolean;
  @Column('boolean', { name: 'cancelled', nullable: false, default: false })
  cancelled: boolean;
  @Column('boolean', {
    name: 'fraud',
    nullable: false,
    default: false,
  })
  fraud: boolean;
  @Column('boolean', { name: 'reversal', nullable: false, default: false })
  reversal: boolean;
  @Column('boolean', {
    name: 'credit_expired',
    nullable: false,
    default: false,
  })
  creditExpired: boolean;
  @Column('integer', { name: 'transaction_id', nullable: false })
  transactionId: number;
  @ManyToOne(
    () => WalletTransaction,
    (walletTransaction) => walletTransaction.walletTransactionDebit,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  walletTransaction: WalletTransaction;
}
