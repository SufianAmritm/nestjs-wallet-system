import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/entity/base.entity';
import { Country } from 'src/modules/country/entity/country.entity';
import { User } from 'src/modules/user/entity/user.entity';
@Entity('city', { schema: 'wallet' })
export class City extends BaseEntity {
  @Column('character varying', { name: 'name', nullable: false })
  name: string;
  @Column('integer', { name: 'country_id', nullable: false })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.city, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country: Country;
  @OneToMany(() => User, (user) => user.city, { cascade: true })
  user: User[];
}
