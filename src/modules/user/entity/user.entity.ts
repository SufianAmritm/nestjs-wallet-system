import { BaseEntity } from 'src/common/database/entity/base.entity';
import { City } from 'src/modules/city/entity/city.entity';
import { Coins } from 'src/modules/coins/entity/coins.entity';
import { Wallet } from 'src/modules/wallet/entity/wallet.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('user', { schema: 'wallet' })
export class User extends BaseEntity {
  @Column('character varying', { name: 'name', nullable: false })
  name: string;
  @Column('integer', { name: 'city_id', nullable: false })
  cityId: number;
  @ManyToOne(() => City, (city) => city.user)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: City;
  @OneToOne(() => Wallet)
  wallet: Wallet;
  @OneToOne(() => Coins)
  coins: Coins;
}
