import { Injectable } from '@nestjs/common';
import { Coins } from '../entity/coins.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { ICoinsRepository } from '../interface/coinsRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { CoinsSearchDto } from '../dto/coinsSearch.dto';
import { MESSAGE } from '../../../common/customMessages/index';

@Injectable()
export class CoinsRepository
  extends BaseRepository<Coins>
  implements ICoinsRepository
{
  constructor(
    @InjectRepository(Coins)
    protected readonly repository: Repository<Coins>,
  ) {
    super(repository);
  }
  async findCoinsRelationsAndSearch(pattern: CoinsSearchDto): Promise<Coins[]> {
    const { id, amount, userId, keyword } = pattern;

    if (id || amount || userId) {
      const whereOption: Partial<Record<string, any>> = {};
      if (id) whereOption.id = id;
      if (amount) whereOption.amount = amount;
      if (userId) whereOption.userId = userId;
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
              .orWhere(`CAST (${alias}.amount as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.userId as text) ILIKE :keyPattern`, {
                keyPattern,
              }),
          ),
        )
        .getMany();
    }
  }
  async deleteCoins(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
