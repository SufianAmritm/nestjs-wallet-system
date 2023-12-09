import { Injectable } from '@nestjs/common';
import { City } from '../entity/city.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { ICityRepository } from '../interface/cityRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { CitySearchDto } from '../dto/citySearch.dto';

@Injectable()
export class CityRepository
  extends BaseRepository<City>
  implements ICityRepository
{
  constructor(
    @InjectRepository(City)
    protected readonly repository: Repository<City>,
  ) {
    super(repository);
  }
  async findCityRelationsAndSearch(pattern: CitySearchDto): Promise<City[]> {
    const { id, name, countryId, keyword } = pattern;

    if (id || name || countryId) {
      const whereOption: Partial<Record<string, any>> = {};
      if (id) whereOption.id = id;
      if (name) whereOption.name = name;
      if (countryId) whereOption.countryId = countryId;
      console.log(whereOption);

      return await this.repository.find({
        where: whereOption,
      });
    }
    const alias: string = this.tableName;
    const keyPattern = `%${keyword}%`;
    console.log(keyPattern);
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
              .orWhere(`CAST(${alias}.countryId as text) ILIKE :keyPattern`, {
                keyPattern,
              }),
          ),
        )
        .getMany();
    }
  }
  async deleteCity(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
