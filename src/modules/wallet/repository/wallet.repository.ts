import { Injectable } from '@nestjs/common';
import { Wallet } from '../entity/wallet.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { IWalletRepository } from '../interface/walletRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { WalletSearchDto } from '../dto/walletSearch.dto';
import { WalletTransaction } from 'src/modules/walletTransaction/entity/walletTransaction.entity';

@Injectable()
export class WalletRepository
  extends BaseRepository<Wallet>
  implements IWalletRepository
{
  constructor(
    @InjectRepository(Wallet)
    protected readonly repository: Repository<Wallet>,
  ) {
    super(repository);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletSearchDto,
    walletTransactions: boolean,
  ): Promise<Wallet[] | WalletTransaction[]> {
    if (walletTransactions) {
      return (
        await this.repository.find({ relations: { walletTransaction: true } })
      ).flatMap((wallet) => wallet.walletTransaction);
    }

    const { id, balance, userId, keyword } = pattern;

    if (id || balance || userId) {
      const whereOption: Partial<Record<string, any>> = {};
      if (id) whereOption.id = id;
      if (balance) whereOption.balance = balance;
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
              .orWhere(`CAST (${alias}.balance as text) ILIKE :keyPattern`, {
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
  async deleteWallet(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
