import { City } from '../entity/city.entity';
export const ICityService = Symbol('ICityService');

export interface ICityService {
  findOneCity(id: number): Promise<City[] | void>;
}
