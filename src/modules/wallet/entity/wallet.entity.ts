import { BaseEntity } from 'src/common/database/entity/base.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction.entity';
import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity('wallet', { schema: 'wallet' })
export class Wallet extends BaseEntity {
  @Column('integer', { name: 'balance', nullable: false, default: 0 })
  balance: number;
  @Column('integer', { name: 'user_id', nullable: false })
  userId: number;
  @OneToOne(() => User, (user) => user.wallet, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @OneToMany(
    () => WalletTransaction,
    (walletTransaction) => walletTransaction.wallet,
    { cascade: true },
  )
  walletTransaction: WalletTransaction[];
}
