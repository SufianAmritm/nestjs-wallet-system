import { Injectable } from '@nestjs/common';
import { CoinTransactionCredit } from '../entity/coinTransactionCredit.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { ICoinTransactionCreditRepository } from '../interface/coinTransactionCreditRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { CoinTransactionCreditSearchDto } from '../dto/coinTransactionCreditSearch.dto';

@Injectable()
export class CoinTransactionCreditRepository
  extends BaseRepository<CoinTransactionCredit>
  implements ICoinTransactionCreditRepository
{
  constructor(
    @InjectRepository(CoinTransactionCredit)
    protected readonly repository: Repository<CoinTransactionCredit>,
  ) {
    super(repository);
  }
  async findCoinRelationsAndSearch(
    pattern: CoinTransactionCreditSearchDto,
  ): Promise<CoinTransactionCredit[]> {
    const {
      coinSku,

      coinConversion,

      transactionId,
      id,
      amount,
      keyword,
    } = pattern;

    if (id || coinSku || coinConversion || transactionId || amount) {
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
              )
              .orWhere(`CAST(${alias}.coinSku as text) ILIKE :keyPattern`, {
                keyPattern,
              }),
          ),
        )
        .getMany();
    }
  }
  async deleteCoinTransactionCredit(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
