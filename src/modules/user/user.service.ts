import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/userRepo.interface';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import {
  classToPlain,
  instanceToInstance,
  plainToClass,
} from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserSearchDto } from './dto/userSearch.dto';
import { validResult } from 'src/utils/valid/result.valid';
import { validPattern } from 'src/utils/valid/pattern.valid';
import { MESSAGE, OPERATION, USER_CSV } from 'src/common/customMessages';
import * as csv from 'csv-parser';
import { UserCsvDto } from './dto/usercsv.dto';
import { UserCsvPostAndUpdateDto } from './dto/usercsvpostandupdate.dto';
import { error } from 'console';
import { json } from 'express';
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
    const walletandCoinRelations =
      await this.repository.findUserRelationsAndSearch(
        { id: id },
        true,
        false,
        false,
      );

    return await this.repository.deleteUser(walletandCoinRelations);
  }
  async findUserRelationsAndSearch(
    pattern: UserSearchDto,
    findAllRelations: boolean,
    findWallets: boolean,
    findCoins: boolean,
  ): Promise<User[] | void> {
    validPattern<UserSearchDto>(pattern, this.tableName);

    const result = await this.repository.findUserRelationsAndSearch(
      pattern,
      findAllRelations,
      findWallets,
      findCoins,
    );
    return validResult<User[]>(result, this.tableName);
  }
  async postUserCsv(
    file: Express.Multer.File,
    operation: string,
  ): Promise<User[] | number[]> {
    const parser = csv();
    const invalidIds: number[] = [];
    const postIds: number[] = [];
    const collectedData: User[] = [];
    let data = new UserUpdateDto();
    let addResult: User[] = [];
    let dataToPost;

    parser.on('data', (row) => {
      if (Object.keys(row).length === 0) {
        return;
      }
      const isValidRow: boolean = Object.values(USER_CSV).every((key) =>
        row.hasOwnProperty(key),
      );
      if (!isValidRow) {
        throw new Error(MESSAGE.INVALID_FILE);
      }
      if (operation === OPERATION.ADD) {
        for (let key in row) {
          data[key] = row[key];

          delete data['id'];
        }

        dataToPost = { ...data };
      }
      if (operation === OPERATION.UPDATE) {
        for (let key in row) {
          data[key] = row[key];
        }

        dataToPost = { ...data };
      }

      postIds.push(Number(row['id']));
      collectedData.push(dataToPost as User);
      console.log(collectedData);
    });

    parser.on('end', async () => {
      if (operation === OPERATION.UPDATE) {
        const validIds = (await this.repository.checkValidIds(postIds)).flatMap(
          (item: User) => item.id,
        );
        const ids = postIds.filter((item) =>
          validIds.includes(item) ? item : invalidIds.push(item),
        );

        console.log(ids);
        collectedData.map(async (item) => {
          const id = item.id;

          if (ids.includes(Number(id))) {
            delete item.id;
            console.log(item);
            await this.repository.updateById({ id: id }, item);
          }
        });
      }
      if (operation === OPERATION.ADD) {
        addResult = await this.repository.postDataInBulk(collectedData);
      }
    });
    parser.on('error', (err) => {
      throw new Error(err.message);
    });
    parser.write(file.buffer);
    parser.end();
    if (operation === OPERATION.ADD) {
      return addResult;
    } else {
      return invalidIds;
    }
  }
}
