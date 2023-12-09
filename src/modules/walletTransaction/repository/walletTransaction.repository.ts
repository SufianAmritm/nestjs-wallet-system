import { Injectable } from '@nestjs/common';
import { WalletTransaction } from '../entity/walletTransaction.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { IWalletTransactionRepository } from '../interface/walletTransactionRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { WalletTransactionSearchDto } from '../dto/walletTransactionSearch.dto';

@Injectable()
export class WalletTransactionRepository
  extends BaseRepository<WalletTransaction>
  implements IWalletTransactionRepository
{
  constructor(
    @InjectRepository(WalletTransaction)
    protected readonly repository: Repository<WalletTransaction>,
  ) {
    super(repository);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletTransactionSearchDto,
  ): Promise<WalletTransaction[]> {
    const {
      id,
      amount,
      walletId,
      credit,
      debit,
      openingWalletBalance,
      closingWalletBalance,
      keyword,
    } = pattern;

    if (id || amount || walletId) {
      const whereOption: Partial<Record<string, any>> = {};
      if (id) whereOption.id = id;
      if (amount) whereOption.amount = amount;
      if (walletId) whereOption.walletId = walletId;
      if (credit) whereOption.credit = credit;
      if (debit) whereOption.debit = debit;
      if (openingWalletBalance)
        whereOption.openingWalletBalance = openingWalletBalance;
      if (closingWalletBalance)
        whereOption.closingWalletBalance = closingWalletBalance;
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
              .orWhere(`CAST(${alias}.walletId as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.credit as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.debit as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(
                `CAST(${alias}.openingWalletBalance as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )
              .orWhere(
                `CAST(${alias}.closingWalletBalance as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              ),
          ),
        )
        .getMany();
    }
  }
  async deleteWalletTransaction(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
