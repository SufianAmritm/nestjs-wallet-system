import { Injectable } from '@nestjs/common';
import { Country } from '../entity/country.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { ICountryRepository } from '../interface/countryRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  DeleteResult,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

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
    if (city) {
      return (
        await this.repository.find({ relations: { city: true } })
      ).flatMap((country) => country.city);
    }

    const { id, name, currency, keyword } = pattern;

    if (id || name || currency) {
      const whereOption: FindOptionsWhere<Country> = {};

      for (const i in pattern) {
        if (i !== keyword) {
          whereOption[i] = pattern[i];
        }
      }

      const result: Country[] = await this.repository.find({
        where: whereOption,
      });
      return result;
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
