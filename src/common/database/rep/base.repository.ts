import {
  EntityManager,
  Repository,
  UpdateResult,
  EntityTarget,
  FindOptionsWhere,
  QueryFailedError,
} from 'typeorm';

import { MESSAGE } from 'src/common/customMessages';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { dbError } from 'src/utils/database.error';

export class BaseRepository<T> {
  public tableName: string;
  constructor(protected readonly repository: Repository<T>) {
    this.tableName = this.repository.metadata.tableName;
  }
  async findAll(): Promise<T[]> {
    return await this.repository
      .find()
      .then((result: T[]) => result)
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }

  async postData(data: T): Promise<T | void> {
    return this.repository
      .save(data)
      .then((result: T) => result)
      .catch(async (error: Error) => {
        await dbError(error);
        throw new Error(error.message);
      });
  }
  async findById(whereOption: FindOptionsWhere<T>): Promise<T[]> {
    try {
      return await this.repository.find({ where: whereOption });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateById(
    whereOption: FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.repository
      .update(whereOption, data)
      .then((result: UpdateResult) => {
        if (result.affected) {
          return result;
        }
        throw new Error(`${MESSAGE.NOT_FOUND} in ${this.tableName}`);
      })
      .catch(async (error: Error) => {
        await dbError(error);
        throw new Error(error.message);
      });
  }

  async postDataWithTransaction(data: T): Promise<T> {
    return await this.repository.manager.transaction(
      async (transactionManager: EntityManager) => {
        return await transactionManager
          .save(data)
          .then((result: T) => result)
          .catch(async (error: Error) => {
            await dbError(error);
            throw new Error(error.message);
          });
      },
    );
  }

  async updateByIdWithTransaction(
    id: number,
    data: QueryDeepPartialEntity<T>,
    entity: EntityTarget<T>,
  ): Promise<any> {
    return await this.repository.manager.transaction(
      async (transactionManager: EntityManager) => {
        return await transactionManager
          .update(entity, { id: id }, data)
          .then((result: UpdateResult) => {
            if (result.affected) {
              return result;
            }
            throw new Error(`${MESSAGE.NOT_FOUND} in ${this.tableName}`);
          })
          .catch(async (error: Error) => {
            await dbError(error);
            throw new Error(error.message);
          });
      },
    );
  }
}
