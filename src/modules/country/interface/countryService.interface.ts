import { Country } from '../entity/country.entity';
export const ICountryService = Symbol('ICountryService');

export interface ICountryService {
  findOneCountry(id: number): Promise<Country[] | void>;
}
