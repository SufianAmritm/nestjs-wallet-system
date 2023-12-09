import { Injectable } from '@nestjs/common';
import { WalletTransactionDebit } from '../entity/walletTransactionDebit.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { IWalletTransactionDebitRepository } from '../interface/walletTransactionDebitRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { WalletTransactionDebitSearchDto } from '../dto/walletTransactionDebitSearch.dto';

@Injectable()
export class WalletTransactionDebitRepository
  extends BaseRepository<WalletTransactionDebit>
  implements IWalletTransactionDebitRepository
{
  constructor(
    @InjectRepository(WalletTransactionDebit)
    protected readonly repository: Repository<WalletTransactionDebit>,
  ) {
    super(repository);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletTransactionDebitSearchDto,
  ): Promise<WalletTransactionDebit[]> {
    const {
      transactionId,
      id,
      amount,
      keyword,
      usageAtCheckout,
      cancelled,
      fraud,
      reversal,
      creditExpired,
    } = pattern;

    if (
      id ||
      usageAtCheckout ||
      cancelled ||
      fraud ||
      reversal ||
      creditExpired ||
      transactionId ||
      amount
    ) {
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
                `CAST(${alias}.usageAtCheckout as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )
              .orWhere(`CAST(${alias}.cancelled as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.fraud as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.reversal as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(
                `CAST(${alias}.creditExpired as text) ILIKE :keyPattern`,
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
  async deleteWalletTransactionDebit(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
