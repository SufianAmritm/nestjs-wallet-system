import { BaseEntity } from 'src/common/database/entity/base.entity';
import { CoinTransaction } from 'src/modules/coinTransaction/entity/coinTransaction.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('coin_debit', { schema: 'wallet' })
export class CoinTransactionDebit extends BaseEntity {
  @Column('boolean', {
    name: 'coin_conversion',
    nullable: false,
    default: false,
  })
  coinConversion: boolean;
  @Column('integer', { name: 'transaction_id', nullable: false })
  transactionId: number;
  @OneToOne(() => CoinTransaction)
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  coinTransaction: CoinTransaction;
}
