import { BaseEntity } from 'src/common/database/entity/base.entity';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('wallet_transaction_credit', { schema: 'wallet' })
export class WalletTransactionCredit extends BaseEntity {
  @Column('integer', { name: 'amount', nullable: false })
  amount: number;
  @Column('boolean', { name: 'free_credit', nullable: false, default: false })
  freeCredit: boolean;
  @Column('boolean', { name: 'paid_credit', nullable: false, default: false })
  paidCredit: boolean;
  @Column('boolean', {
    name: 'coin_conversion',
    nullable: false,
    default: false,
  })
  coinConversion: boolean;
  @Column('boolean', { name: 'gift', nullable: false, default: false })
  gift: boolean;
  @Column('boolean', { name: 'refund', nullable: false, default: false })
  refund: boolean;
  @Column('boolean', {
    name: 'cash_paid_to_delivery_agent',
    nullable: false,
    default: false,
  })
  cashPaidToDeliveryAgent: boolean;
  @Column('boolean', {
    name: 'unfullfillment',
    nullable: false,
    default: false,
  })
  unfullfillment: boolean;
  @Column('boolean', {
    name: 'partial_acceptance',
    nullable: false,
    default: false,
  })
  partialAcceptance: boolean;
  @Column('boolean', { name: 'ibill_top_up', nullable: false, default: false })
  iBillTopUp: boolean;
  @Column('integer', { name: 'transaction_id', nullable: false })
  transactionId: number;
  @ManyToOne(
    () => WalletTransaction,
    (walletTransaction) => walletTransaction.walletTransactionCredit,
  )
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  walletTransaction: WalletTransaction;
}
