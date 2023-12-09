import { BaseEntity } from 'src/common/database/entity/base.entity';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('transaction_reason', { schema: 'wallet' })
export class WalletTransactionReason extends BaseEntity {
  @Column('character varying', { name: 'reason', nullable: false })
  reason: string;
  @Column('integer', { name: 'transaction_id', nullable: false })
  transactionId: number;
  @ManyToOne(
    () => WalletTransaction,
    (walletTransaction) => walletTransaction.WalletTransactionReason,
  )
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  walletTransaction: WalletTransaction;
}
