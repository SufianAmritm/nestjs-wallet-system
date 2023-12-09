import { Injectable } from '@nestjs/common';
import { WalletTransactionReason } from '../entity/walletTransactionReason.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { IWalletTransactionReasonRepository } from '../interface/walletTransactionReasonRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { WalletTransactionReasonSearchDto } from '../dto/walletTransactionReasonSearch.dto';

@Injectable()
export class WalletTransactionReasonRepository
  extends BaseRepository<WalletTransactionReason>
  implements IWalletTransactionReasonRepository
{
  constructor(
    @InjectRepository(WalletTransactionReason)
    protected readonly repository: Repository<WalletTransactionReason>,
  ) {
    super(repository);
  }

  async deleteWalletTransactionReason(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async findWalletTransactionReasonRelationsAndSearch(
    pattern: WalletTransactionReasonSearchDto,
  ): Promise<WalletTransactionReason[]> {
    const { id, reason, transactionId, keyword } = pattern;

    if (id || reason || transactionId) {
      const whereOption: Partial<Record<string, any>> = {};

      for (const i in pattern) {
        if (i !== keyword) {
          whereOption[i] = pattern[i];
        }
      }

      const result: WalletTransactionReason[] = await this.repository.find({
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
              .orWhere(`CAST (${alias}.reason as text) ILIKE :keyPattern`, {
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
}
