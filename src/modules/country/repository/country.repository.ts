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

  async deleteCountry(countryRelations: any): Promise<DeleteResult> {
    try {
      return await this.repository.softRemove(countryRelations);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findCountryRelationsAndSearch(
    pattern: CountrySearchDto,
    findAllRelations: boolean,
    findCity: boolean,
  ): Promise<Country[] | City[]> {
    const findOptionRelations = {
      where: { id: pattern.id },
      relations: ['city', 'city.user', 'city.user.wallet', 'city.user.coins'],
    };
    const findOptionCity = {
      where: { id: pattern.id },
      relations: {
        city: true,
      },
    };
    if (findAllRelations) {
      return await this.repository.find(findOptionRelations);
    }
    if (findCity) {
      return await this.repository.find(findOptionCity);
    }
    const { id, name, currency, keyword } = pattern;

    if (id || name || currency) {
      const whereOption: Partial<Record<string, any>> = {};

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
