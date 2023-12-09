import { BaseRepository } from 'src/common/database/rep/base.repository';
import { User } from '../entity/user.entity';
import { DeleteResult } from 'typeorm';
import { UserSearchDto } from '../dto/userSearch.dto';
import { Wallet } from 'src/modules/wallet/entity/wallet.entity';
export const IUserRepository = Symbol('IUserRepository');
export interface IUserRepository extends BaseRepository<User> {
  deleteUser(id: number): Promise<DeleteResult>;
  findUserRelationsAndSearch(
    pattern: UserSearchDto,
    wallet: boolean,
  ): Promise<User[] | Wallet[]>;
}
