import { BaseRepository } from 'src/common/database/rep/base.repository';
import { User } from '../entity/user.entity';
import { DeleteResult } from 'typeorm';
import { UserSearchDto } from '../dto/userSearch.dto';
export const IUserRepository = Symbol('IUserRepository');
export interface IUserRepository extends BaseRepository<User> {
  deleteUser(walletAndCoinRelations: any): Promise<DeleteResult>;
  findUserRelationsAndSearch(
    pattern: UserSearchDto,
    findAllRelations: boolean,
    findWallets: boolean,
    findCoins: boolean,
  ): Promise<User[]>;
  checkValidIds(ids: Number[]): Promise<any>;
}
