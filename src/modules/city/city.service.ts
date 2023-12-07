/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICityRepository } from './interface/cityRep.interface';
import { City } from './entity/city.entity';
import { error } from 'console';

@Injectable()
export class CityService {
  constructor(
    @Inject(ICityRepository) private readonly cityRepository: ICityRepository,
  ) {}

  async findAllCitites(): Promise<City[]> {
    try {
      return await this.cityRepository.findAll();
    } catch (error) {}
  }
}
