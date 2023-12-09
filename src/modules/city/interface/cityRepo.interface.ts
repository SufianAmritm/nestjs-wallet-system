import { BaseRepository } from 'src/common/database/rep/base.repository';
import { City } from '../entity/city.entity';
import { DeleteResult } from 'typeorm';
import { CitySearchDto } from '../dto/citySearch.dto';
import { User } from 'src/modules/user/entity/user.entity';
export const ICityRepository = Symbol('ICityRepository');
export interface ICityRepository extends BaseRepository<City> {
  deleteCity(id: number): Promise<DeleteResult>;
  findCityRelationsAndSearch(
    pattern: CitySearchDto,
    user: boolean,
  ): Promise<City[] | User[]>;
  deleteCityByCountryId(id: number): Promise<User[]>;
}
