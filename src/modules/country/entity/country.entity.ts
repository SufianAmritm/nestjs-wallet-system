import { BaseEntity } from 'src/common/database/entity/base.entity';
import { City } from 'src/modules/city/entity/city.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('country', { schema: 'wallet' })
export class Country extends BaseEntity {
  @Column('character varying', {
    name: 'name',
    nullable: false,
  })
  name: string;
  @Column('character varying', {
    nullable: false,
    name: 'currency',
  })
  currency: string;
  @OneToMany(() => City, (city) => city.country)
  city: City[];
}
