import { BaseRepository } from 'src/common/database/rep/base.repository';
import { Country } from '../entity/country.entity';
import { DeleteResult } from 'typeorm';
import { CountrySearchDto } from '../dto/countrySearch.dto';
import { City } from 'src/modules/city/entity/city.entity';
export const ICountryRepository = Symbol('ICountryRepository');
export interface ICountryRepository extends BaseRepository<Country> {
  deleteCountry(id: number): Promise<DeleteResult>;
  findCountryRelationsAndSearch(
    pattern: CountrySearchDto,
    city: boolean,
  ): Promise<Country[] | City[]>;
}
