/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICityRepository } from './interface/cityRepo.interface';
import { CityDto } from './dto/city.dto';
import { City } from './entity/city.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { MESSAGE } from 'src/common/customMessages';
import { CityUpdateDto } from './dto/cityUpdate.dto';
import { CitySearchDto } from './dto/citySearch.dto';
// import { ICountryService } from '../country/interface/countryService.interface';
import { ICityService } from './interface/cityService.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    @Inject(ICityRepository) private readonly repository: ICityRepository,
    // @Inject(ICountryService) private readonly countryService: ICountryService,
  ) {}

  async postCity(body: CityDto): Promise<City | void> {
    const data: City = plainToClass(City, body);

    return await this.repository.postData(data);
  }

  async postCityWithTransaction(body: CityDto): Promise<City> {
    const data: City = plainToClass(City, body);

    return await this.repository.postDataWithTransaction(data);
  }
  async findAllCities(): Promise<City[]> {
    return await this.repository.findAll();
  }
  async findOneCity(id: number): Promise<City[] | void> {
    const findOption: FindOptionsWhere<City> = { id: id };
    return await this.repository.findById(findOption);
  }
  async updateCity(id: number, body: CityUpdateDto): Promise<UpdateResult> {
    const data: City = plainToClass(City, body);
    const findOption: FindOptionsWhere<City> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateCityWithTransaction(
    id: number,
    body: CityUpdateDto,
  ): Promise<UpdateResult> {
    const data: City = plainToClass(City, body);
    return await this.repository.updateByIdWithTransaction(id, data, City);
  }
  async deleteCity(id: number): Promise<DeleteResult> {
    return await this.repository.deleteCity(id);
  }
  async findCityRelationsAndSearch(pattern: CitySearchDto): Promise<City[]> {
    if (Object.keys(pattern).length === 0) {
      throw new Error(
        `${MESSAGE.EMPTY_SEARCH_QUERY} in ${this.repository.tableName}`,
      );
    }
    const result = await this.repository.findCityRelationsAndSearch(pattern);
    console.log(result);
    if (result.length > 0) {
      return result;
    } else {
      throw new Error(`${MESSAGE.NOT_FOUND} in ${this.repository.tableName}`);
    }
  }
}
