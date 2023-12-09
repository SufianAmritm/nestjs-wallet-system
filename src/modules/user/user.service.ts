import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/userRepo.interface';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { MESSAGE } from 'src/common/customMessages';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserSearchDto } from './dto/userSearch.dto';
import { ICityService } from '../city/interface/cityService.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly repository: IUserRepository,
    // @Inject(ICityService) private readonly cityService: ICityService,
  ) {}

  async postUser(body: UserDto): Promise<User | void> {
    const data: User = plainToClass(User, body);

    return await this.repository.postData(data);
  }

  async postUserWithTransaction(body: UserDto): Promise<User> {
    const data: User = plainToClass(User, body);

    return await this.repository.postDataWithTransaction(data);
  }
  async findAllCities(): Promise<User[]> {
    return await this.repository.findAll();
  }
  async findOneUser(id: number): Promise<User[] | void> {
    const findOption: FindOptionsWhere<User> = { id: id };
    return await this.repository.findById(findOption);
  }
  async updateUser(id: number, body: UserUpdateDto): Promise<UpdateResult> {
    const data: User = plainToClass(User, body);
    const findOption: FindOptionsWhere<User> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateUserWithTransaction(
    id: number,
    body: UserUpdateDto,
  ): Promise<UpdateResult> {
    const data: User = plainToClass(User, body);
    return await this.repository.updateByIdWithTransaction(id, data, User);
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.repository.deleteUser(id);
  }
  async findUserRelationsAndSearch(
    pattern: UserSearchDto,
  ): Promise<User[] | string> {
    if (Object.keys(pattern).length === 0) {
      throw new Error(
        `${MESSAGE.EMPTY_SEARCH_QUERY} in ${this.repository.tableName}`,
      );
    }

    const result = await this.repository.findUserRelationsAndSearch(pattern);
    if (result !== undefined) {
      return result;
    } else {
      throw new Error(`${MESSAGE.NOT_FOUND} in ${this.repository.tableName}`);
    }
  }
}
