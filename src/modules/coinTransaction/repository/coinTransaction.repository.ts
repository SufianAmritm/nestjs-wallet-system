import { Injectable } from '@nestjs/common';
import { CoinTransaction } from '../entity/coinTransaction.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { ICoinTransactionRepository } from '../interface/coinTransactionRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { CoinTransactionSearchDto } from '../dto/coinTransactionSearch.dto';

@Injectable()
export class CoinTransactionRepository
  extends BaseRepository<CoinTransaction>
  implements ICoinTransactionRepository
{
  constructor(
    @InjectRepository(CoinTransaction)
    protected readonly repository: Repository<CoinTransaction>,
  ) {
    super(repository);
  }
  async findCoinsRelationsAndSearch(
    pattern: CoinTransactionSearchDto,
  ): Promise<CoinTransaction[]> {
    const {
      id,
      amount,
      coinsId,
      credit,
      debit,
      openingCoinsAmount,
      closingCoinsAmount,
      keyword,
    } = pattern;

    if (id || amount || coinsId) {
      const whereOption: Partial<Record<string, any>> = {};
      if (id) whereOption.id = id;
      if (amount) whereOption.amount = amount;
      if (coinsId) whereOption.coinsId = coinsId;
      if (credit) whereOption.credit = credit;
      if (debit) whereOption.debit = debit;
      if (openingCoinsAmount)
        whereOption.openingCoinsAmount = openingCoinsAmount;
      if (closingCoinsAmount)
        whereOption.closingCoinsAmount = closingCoinsAmount;

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
              .orWhere(`CAST(${alias}.coinsId as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.credit as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.debit as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(
                `CAST(${alias}.openingCoinsAmount as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )
              .orWhere(
                `CAST(${alias}.closingCoinsAmount as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              ),
          ),
        )
        .getMany();
    }
  }
  async deleteCoinTransaction(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
