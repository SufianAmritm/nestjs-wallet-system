import { Injectable } from '@nestjs/common';
import { Country } from '../entity/country.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { ICountryRepository } from '../interface/countryRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { CountrySearchDto } from '../dto/countrySearch.dto';
import { City } from 'src/modules/city/entity/city.entity';

@Injectable()
export class CountryRepository
  extends BaseRepository<Country>
  implements ICountryRepository
{
  constructor(
    @InjectRepository(Country)
    protected readonly repository: Repository<Country>,
  ) {
    super(repository);
  }

  async deleteCountry(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findCountryRelationsAndSearch(
    pattern: CountrySearchDto,
    city: boolean,
  ): Promise<Country[] | City[]> {
    const { id, name, currency, keyword } = pattern;

    if (id || name || currency) {
      const whereOption: Partial<Record<string, any>> = {};

      for (const i in pattern) {
        if (i !== keyword) {
          whereOption[i] = pattern[i];
        }
      }

      const relationOption: Record<string, any> = {};

      if (city === true) {
        relationOption.city = true;
      }
      const result: Country[] = await this.repository.find({
        where: whereOption,
        relations: relationOption,
      });
      if (city === true) {
        return result.flatMap((item) => item.city);
      } else return result;
    }
    const alias: string = this.tableName;
    const keyPattern = `%${keyword}%`;

    if (keyword) {
      return await this.repository
        .createQueryBuilder(alias)
        .where(
          new Brackets((qb) =>
            qb
              .where(`CAST (${alias}.id as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST (${alias}.name as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.currency as text) ILIKE :keyPattern`, {
                keyPattern,
              }),
          ),
        )

        .getMany();
    }
  }
}
