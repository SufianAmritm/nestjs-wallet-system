/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICoinsRepository } from './interface/coinsRepo.interface';
import { CoinsDto } from './dto/coins.dto';
import { Coins } from './entity/coins.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { MESSAGE } from 'src/common/customMessages';
import { CoinsUpdateDto } from './dto/coinsUpdate.dto';
import { CoinsSearchDto } from './dto/coinsSearch.dto';
import { validResult } from 'src/utils/valid/result.valid';

@Injectable()
export class CoinsService {
  constructor(
    @Inject(ICoinsRepository) private readonly repository: ICoinsRepository,
  ) {}

  async postCoins(body: CoinsDto): Promise<Coins | void> {
    const data: Coins = plainToClass(Coins, body);
    return await this.repository.postData(data);
  }

  async postCoinsWithTransaction(body: CoinsDto): Promise<Coins> {
    const data: Coins = plainToClass(Coins, body);
    return await this.repository.postDataWithTransaction(data);
  }
  async findAllCoins(): Promise<Coins[]> {
    return await this.repository.findAll();
  }
  async findOneCoins(id: number): Promise<Coins[] | void> {
    const findOption: FindOptionsWhere<Coins> = { id: id };
    return await this.repository.findById(findOption);
  }
  async updateCoins(id: number, body: CoinsUpdateDto): Promise<UpdateResult> {
    const data: Coins = plainToClass(Coins, body);
    const findOption: FindOptionsWhere<Coins> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateCoinsWithTransaction(
    id: number,
    body: CoinsUpdateDto,
  ): Promise<UpdateResult> {
    const data: Coins = plainToClass(Coins, body);
    return await this.repository.updateByIdWithTransaction(id, data, Coins);
  }
  async deleteCoins(id: number): Promise<DeleteResult> {
    return await this.repository.deleteCoins(id);
  }
  async findCoinsRelationsAndSearch(
    pattern: CoinsSearchDto,
  ): Promise<Coins[] | void> {
    if (Object.keys(pattern).length === 0) {
      throw new Error(
        `${MESSAGE.EMPTY_SEARCH_QUERY} in ${this.repository.tableName}`,
      );
    }
    const result = await this.repository.findCoinsRelationsAndSearch(pattern);
    console.log(result);
    return validResult<Coins[]>(result, this.repository.tableName);
  }
}
