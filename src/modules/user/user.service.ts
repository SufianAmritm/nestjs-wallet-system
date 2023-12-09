import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/userRepo.interface';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserSearchDto } from './dto/userSearch.dto';
import { validResult } from 'src/utils/valid/result.valid';
import { validPattern } from 'src/utils/valid/pattern.valid';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly repository: IUserRepository,
  ) {}
  public readonly tableName: string = this.repository.tableName;
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
    const result: User[] = await this.repository.findById(findOption);
    return validResult<User[]>(result, this.tableName);
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
  ): Promise<User[] | void> {
    validPattern<UserSearchDto>(pattern, this.tableName);

    const result = await this.repository.findUserRelationsAndSearch(pattern);
    return validResult<User[]>(result, this.tableName);
  }
}
