import { BaseRepository } from 'src/common/database/rep/base.repository';
import { City } from '../entity/city.entity';
import { DeleteResult } from 'typeorm';
import { CitySearchDto } from '../dto/citySearch.dto';
export const ICityRepository = Symbol('ICityRepository');
export interface ICityRepository extends BaseRepository<City> {
  deleteCity(cityRelations: any): Promise<DeleteResult>;
  findCityRelationsAndSearch(
    pattern: CitySearchDto,
    findAllRelations: boolean,
    findUsers: boolean,
  ): Promise<City[]>;
}
