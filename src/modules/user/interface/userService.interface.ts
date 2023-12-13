import { DeleteResult } from 'typeorm';
import { User } from '../entity/user.entity';
export const IUserService = Symbol('IUserService');

export interface IUserService {
  findOneUser(id: number): Promise<User[] | void>;
  deleteUserByCityId(id: number): Promise<DeleteResult>;
}
