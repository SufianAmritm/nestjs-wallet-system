import { BaseEntity } from 'src/common/database/entity/base.entity';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('wallet_Transaction_debit', { schema: 'wallet' })
export class WalletTransactionDebit extends BaseEntity {
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
  @OneToOne(() => WalletTransaction)
  @JoinColumn({ name: 'Transaction_id', referencedColumnName: 'id' })
  walletTransaction: WalletTransaction;
}
