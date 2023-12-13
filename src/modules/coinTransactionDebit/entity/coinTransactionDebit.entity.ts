import { BaseEntity } from 'src/common/database/entity/base.entity';
import { CoinTransaction } from 'src/modules/coinTransaction/entity/coinTransaction.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('coin_transaction_debit', { schema: 'wallet' })
export class CoinTransactionDebit extends BaseEntity {
  @Column('integer', { name: 'amount', nullable: false })
  amount: number;
  @Column('boolean', {
    name: 'coin_conversion',
    nullable: false,
    default: false,
  })
  coinConversion: boolean;
  @Column('integer', { name: 'transaction_id', nullable: false })
  transactionId: number;
  @ManyToOne(
    () => CoinTransaction,
    (coinTransaction) => coinTransaction.coinTransactionDebit,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'transaction_id', referencedColumnName: 'id' })
  coinTransaction: CoinTransaction;
}
