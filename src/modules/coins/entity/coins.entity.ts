import { BaseEntity } from 'src/common/database/entity/base.entity';
import { CoinTransaction } from 'src/modules/coinTransaction/entity/coinTransaction.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('coins', { schema: 'wallet' })
export class Coins extends BaseEntity {
  @Column('integer', { name: 'amount', nullable: false, default: 0 })
  amount: number;
  @Column('integer', { name: 'user_id', nullable: false })
  userId: number;
  @OneToOne(() => User, (user) => user.coins, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @OneToMany(
    () => CoinTransaction,
    (coinTransaction) => coinTransaction.coins,
    { cascade: true },
  )
  coinTransaction: CoinTransaction[];
}
