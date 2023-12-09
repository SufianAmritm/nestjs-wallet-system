import { BaseEntity } from 'src/common/database/entity/base.entity';
import { CoinTransactionCredit } from 'src/modules/coinTransactionCredit/entity/coinTransactionCredit.entity';
import { CoinTransactionDebit } from 'src/modules/coinTransactionDebit/entity/coinTransactionDebit.entity';
import { Coins } from 'src/modules/coins/entity/coins.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('coin_transactions', { schema: 'wallet' })
export class CoinTransaction extends BaseEntity {
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
    name: 'opening_coins_amount',
    nullable: false,
    default: 0,
  })
  openingCoinsAmount: number;
  @Column('integer', {
    name: 'closing_coins_amount',
    nullable: false,
    default: 0,
  })
  closingCoinsAmount: number;
  @Column('integer', { name: 'coins_id', nullable: false })
  coinsId: number;
  @ManyToOne(() => Coins, (coins) => coins.coinTransaction)
  @JoinColumn({ name: 'coins_id', referencedColumnName: 'id' })
  coins: Coins[];
  @OneToMany(
    () => CoinTransactionCredit,
    (coinTransactionCredit) => coinTransactionCredit.coinTransaction,
  )
  coinTransactionCredit: CoinTransactionCredit[];
  @OneToMany(
    () => CoinTransactionDebit,
    (coinTransactionDebit) => coinTransactionDebit.coinTransaction,
  )
  coinTransactionDebit: CoinTransactionDebit[];
}
