import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { IUserRepository } from '../interface/userRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, In, Repository } from 'typeorm';

import { UserSearchDto } from '../dto/userSearch.dto';
import { Wallet } from 'src/modules/wallet/entity/wallet.entity';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }
  async findUserRelationsAndSearch(
    pattern: UserSearchDto,
    findAllRelations: boolean,
    findWallets: boolean,
    findCoins: boolean,
  ): Promise<User[]> {
    const findOptionRelations = {
      where: { id: pattern.id },
      relations: [
        'wallet',

        'wallet.walletTransaction',
        'wallet.walletTransaction.walletTransactionCredit',
        'wallet.walletTransaction.walletTransactionDebit',
        'wallet.walletTransaction.walletTransactionReason',
        'coins',
        'coins.coinTransaction',

        'coins.coinTransaction.coinTransactionCredit',
        'coins.coinTransaction.coinTransactionDebit',
      ],
    };
    const findOptionWallet = {
      where: { id: pattern.id },
      relations: {
        wallet: true,
      },
    };
    const findOptionCoins = {
      where: { id: pattern.id },
      relations: {
        coins: true,
      },
    };
    if (findAllRelations) {
      return await this.repository.find(findOptionRelations);
    }
    if (findWallets) {
      return await this.repository.find(findOptionWallet);
    }
    if (findCoins) {
      return await this.repository.find(findOptionCoins);
    }

    const { id, name, cityId, keyword } = pattern;

    if (id || name || cityId) {
      const whereOption: Partial<Record<string, any>> = {};
      if (id) whereOption.id = id;
      if (name) whereOption.name = name;
      if (cityId) whereOption.countryId = cityId;
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
              .orWhere(`CAST (${alias}.name as text) ILIKE :keyPattern`, {
                keyPattern,
              })
              .orWhere(`CAST(${alias}.cityId as text) ILIKE :keyPattern`, {
                keyPattern,
              }),
          ),
        )
        .getMany();
    }
  }
  async deleteUser(walletAndCoinRelations: any): Promise<DeleteResult> {
    try {
      return await this.repository.softRemove(walletAndCoinRelations);
    } catch (error) {
      throw new Error(error);
    }
  }
  async checkValidIds(ids: Number[]) {
    return await this.repository.find({
      select: { id: true },
      where: { id: In(ids) },
    });
  }
}
