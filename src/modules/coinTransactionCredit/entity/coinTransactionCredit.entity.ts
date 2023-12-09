import { BaseEntity } from 'src/common/database/entity/base.entity';
import { CoinTransaction } from 'src/modules/coinTransaction/entity/coinTransaction.entity';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

@Entity('coin_credit', { schema: 'wallet' })
export class CoinTransactionCredit extends BaseEntity {
  @Column('boolean', {
    name: 'coin_conversion',
    nullable: false,
    default: false,
  })
  coinConversion: boolean;
  @Column('boolean', { name: 'coin_sku', nullable: false, default: false })
  coinSku: boolean;
  @Column('integer', { name: 'transaction_id', nullable: false })
  transactionId: number;
  @OneToOne(() => CoinTransaction)
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  coinTransaction: CoinTransaction;
}
