import { Injectable } from '@nestjs/common';
import { WalletTransactionCredit } from '../entity/walletTransactionCredit.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { IWalletTransactionCreditRepository } from '../interface/walletTransactionCreditRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { WalletTransactionCreditSearchDto } from '../dto/walletTransactionCreditSearch.dto';

@Injectable()
export class WalletTransactionCreditRepository
  extends BaseRepository<WalletTransactionCredit>
  implements IWalletTransactionCreditRepository
{
  constructor(
    @InjectRepository(WalletTransactionCredit)
    protected readonly repository: Repository<WalletTransactionCredit>,
  ) {
    super(repository);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletTransactionCreditSearchDto,
  ): Promise<WalletTransactionCredit[]> {
    const {
      freeCredit,
      paidCredit,
      coinConversion,
      refund,
      cashPaidToDeliveryAgent,
      unfullfillment,
      partialAcceptance,
      IBillTopUp,
      transactionId,
      id,
      keyword,
    } = pattern;

    if (
      id ||
      freeCredit ||
      paidCredit ||
      coinConversion ||
      refund ||
      cashPaidToDeliveryAgent ||
      unfullfillment ||
      partialAcceptance ||
      IBillTopUp ||
      transactionId ||
      keyword
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
              .orWhere(
                `CAST(${alias}.coinConversion as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )
              .orWhere(`CAST(${alias}.refund as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(
                `CAST(${alias}.cashPaidToDeliveryAgent as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )
              .orWhere(
                `CAST(${alias}.unfullfillment as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )
              .orWhere(
                `CAST(${alias}.partialAcceptance as text) ILIKE :keyPattern`,
                {
                  keyPattern,
                },
              )
              .orWhere(`CAST(${alias}.IBillTopUp as text) ILIKE :keyPattern`, {
                keyPattern,
              })
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
  async deleteWalletTransactionCredit(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
