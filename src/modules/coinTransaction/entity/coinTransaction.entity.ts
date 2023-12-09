import { BaseEntity } from 'src/common/database/entity/base.entity';
import { CoinTransactionCredit } from 'src/modules/coinTransactionCredit/entity/coinTransactionCredit.entity';
import { CoinTransactionDebit } from 'src/modules/coinTransactionDebit/entity/coinTransactionDebit.entity';
import { Coins } from 'src/modules/coins/entity/coins.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('coin_transactions', { schema: 'wallet' })
export class CoinTransaction extends BaseEntity {
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
  @OneToOne(() => CoinTransactionCredit)
  coinTransactionCredit: CoinTransactionCredit;
  @OneToOne(() => CoinTransactionDebit)
  coinTransactionDebit: CoinTransactionDebit;
}
