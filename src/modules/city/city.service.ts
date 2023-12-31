import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validPattern } from 'src/utils/valid/pattern.valid';
import { validResult } from 'src/utils/valid/result.valid';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';

import { CityDto } from './dto/city.dto';
import { CitySearchDto } from './dto/citySearch.dto';
import { CityUpdateDto } from './dto/cityUpdate.dto';
import { City } from './entity/city.entity';
import { ICityRepository } from './interface/cityRepo.interface';
import { ICityService } from './interface/cityService.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    @Inject(ICityRepository) private readonly repository: ICityRepository,
  ) {}
  public readonly tableName: string = this.repository.tableName;
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
    const result: City[] = await this.repository.findById(findOption);
    return validResult<City[]>(result, this.tableName);
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
    const cityRelations = await this.repository.findCityRelationsAndSearch(
      { id: id },
      true,
      false,
    );

    return await this.repository.deleteCity(cityRelations);
  }
  async findCityRelationsAndSearch(
    pattern: CitySearchDto,
    findAllRelations: boolean,
    findUsers: boolean,
  ): Promise<City[] | void> {
    validPattern<CitySearchDto>(pattern, this.tableName);
    const result = await this.repository.findCityRelationsAndSearch(
      pattern,
      findAllRelations,
      findUsers,
    );
    return validResult<City[]>(result, this.tableName);
  }
}
