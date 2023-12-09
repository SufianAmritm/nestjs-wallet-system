import { Injectable } from '@nestjs/common';
import { CoinTransactionDebit } from '../entity/coinTransactionDebit.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { ICoinTransactionDebitRepository } from '../interface/coinTransactionDebitRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { CoinTransactionDebitSearchDto } from '../dto/coinTransactionDebitSearch.dto';

@Injectable()
export class CoinTransactionDebitRepository
  extends BaseRepository<CoinTransactionDebit>
  implements ICoinTransactionDebitRepository
{
  constructor(
    @InjectRepository(CoinTransactionDebit)
    protected readonly repository: Repository<CoinTransactionDebit>,
  ) {
    super(repository);
  }
  async findCoinRelationsAndSearch(
    pattern: CoinTransactionDebitSearchDto,
  ): Promise<CoinTransactionDebit[]> {
    const { transactionId, id, amount, keyword, coinConversion } = pattern;

    if (id || coinConversion || transactionId || amount) {
      const whereOption: Partial<Record<string, any>> = {};

      for (const i in pattern) {
        if (i !== 'keyword') {
          whereOption[i] = pattern[i];
        }
      }
      return await this.repository.find({
        where: whereOption,
      });
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
              .orWhere(`CAST (${alias}.amount as text) ILIKE :keyPattern`, {
                keyPattern,
              })

              .orWhere(
                `CAST(${alias}.coinConversion as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )

              .orWhere(
                `CAST(${alias}.transactionId as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              ),
          ),
        )
        .getMany();
    }
  }
  async deleteCoinTransactionDebit(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
