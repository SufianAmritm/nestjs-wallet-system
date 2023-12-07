import { BaseRepository } from 'src/common/database/rep/base.repository';
import { City } from '../entity/city.entity';

export const ICityRepository = Symbol('ICityRepository');

export interface ICityRepository extends BaseRepository<City> {}
