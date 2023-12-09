/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICountryRepository } from './interface/countryRepo.interface';
import { CountryDto } from './dto/country.dto';
import { Country } from './entity/country.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { CountryUpdateDto } from './dto/countryUpdate.dto';
import { CountrySearchDto } from './dto/countrySearch.dto';
import { City } from '../city/entity/city.entity';
import { ICountryService } from './interface/countryService.interface';
import { validResult } from 'src/utils/valid/result.valid';
import { ICityService } from '../city/interface/cityService.interface';

@Injectable()
export class CountryService implements ICountryService {
  constructor(
    @Inject(ICountryRepository) private readonly repository: ICountryRepository,
    @Inject(ICityService) private readonly cityService: ICityService,
  ) {}
  public readonly tableName: string = this.repository.tableName;
  async postCountry(body: CountryDto): Promise<Country | void> {
    const data: Country = plainToClass(Country, body);
    return await this.repository.postData(data);
  }

  async postCountryWithTransaction(body: CountryDto): Promise<Country> {
    const data: Country = plainToClass(Country, body);
    return await this.repository.postDataWithTransaction(data);
  }
  async findAll(): Promise<Country[]> {
    return await this.repository.findAll();
  }
  async findOneCountry(id: number): Promise<Country[] | void> {
    const findOption: FindOptionsWhere<Country> = { id: id };
    const result: Country[] = await this.repository.findById(findOption);
    return validResult<Country[]>(result, this.tableName);
  }
  async updateCountry(
    id: number,
    body: CountryUpdateDto,
  ): Promise<UpdateResult> {
    const data: Country = plainToClass(Country, body);
    const findOption: FindOptionsWhere<Country> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateCountryWithTransaction(
    id: number,
    body: CountryUpdateDto,
  ): Promise<UpdateResult> {
    const data: Country = plainToClass(Country, body);
    return await this.repository.updateByIdWithTransaction(id, data, Country);
  }
  async deleteCountry(id: number): Promise<DeleteResult> {
    const cityIds = (
      await this.repository.findCountryRelationsAndSearch({}, true)
    ).flatMap((city) => city.id);
    if (cityIds.length > 0) {
      cityIds.forEach(async (cityId) => {
        await this.cityService.deleteCityByCountryId(Number(cityId));
      });
    }

    return await this.repository.deleteCountry(id);
  }

  async findCountryRelationsAndSearch(
    pattern: CountrySearchDto,
    findCity: boolean,
  ): Promise<Country[] | City[] | void> {
    const result = await this.repository.findCountryRelationsAndSearch(
      pattern,
      findCity,
    );
    return validResult<Country[] | City[]>(result, this.tableName);
  }
}
