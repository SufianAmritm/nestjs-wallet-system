import { BaseEntity } from 'src/common/database/entity/base.entity';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('transaction_reason', { schema: 'wallet' })
export class WalletTransactionReason extends BaseEntity {
  @Column('character varying', { name: 'reason', nullable: false })
  reason: string;
  @OneToOne(() => WalletTransaction)
  @JoinColumn({ name: 'Transaction_id', referencedColumnName: 'id' })
  walletTransaction: WalletTransaction;
}
