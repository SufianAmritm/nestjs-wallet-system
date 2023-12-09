/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICityRepository } from './interface/cityRepo.interface';
import { CityDto } from './dto/city.dto';
import { City } from './entity/city.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { CityUpdateDto } from './dto/cityUpdate.dto';
import { CitySearchDto } from './dto/citySearch.dto';

import { ICityService } from './interface/cityService.interface';
import { validResult } from 'src/utils/valid/result.valid';
import { User } from '../user/entity/user.entity';
import { IUserService } from '../user/interface/userService.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(
    @Inject(ICityRepository) private readonly repository: ICityRepository,
    @Inject(IUserService) private readonly userService: IUserService,
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
    return await this.repository.deleteCity(id);
  }
  async findCityRelationsAndSearch(
    pattern: CitySearchDto,
    user: boolean,
  ): Promise<City[] | User[]> {
    const result = await this.repository.findCityRelationsAndSearch(
      pattern,
      user,
    );
    return validResult<City[] | User[]>(result, this.tableName);
  }
  async deleteCityByCountryId(id: number): Promise<DeleteResult> {
    const userIds = (
      await this.repository.findCityRelationsAndSearch({}, true)
    ).flatMap((user) => user.id);
    if (userIds.length > 0) {
      userIds.forEach(async (userId) => {
        await this.userService.deleteUserByCityId(Number(userId));
      });
    }

    return await this.repository.deleteCity(id);
  }
}
