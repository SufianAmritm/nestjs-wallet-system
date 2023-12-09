import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { IUserRepository } from '../interface/userRepo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, DeleteResult, Repository } from 'typeorm';

import { UserSearchDto } from '../dto/userSearch.dto';

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
  async findUserRelationsAndSearch(pattern: UserSearchDto): Promise<User[]> {
    const { id, name, cityId, keyword } = pattern;

    if (id || name || cityId) {
      const whereOption: Partial<Record<string, any>> = {};
      if (id) whereOption.id = id;
      if (name) whereOption.name = name;
      if (cityId) whereOption.countryId = cityId;
      console.log(whereOption);

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
  async deleteUser(id: number): Promise<DeleteResult> {
    try {
      return await this.repository.softDelete({ id: id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
