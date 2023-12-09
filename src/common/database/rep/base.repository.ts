import {
  EntityManager,
  Repository,
  UpdateResult,
  EntityTarget,
  FindOptionsWhere,
} from 'typeorm';

import { MESSAGE } from 'src/common/customMessages';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { error } from 'console';

export class BaseRepository<T> {
  public tableName: string;
  constructor(protected readonly repository: Repository<T>) {
    this.tableName = this.repository.metadata.tableName;
  }
  async findAll(): Promise<T[]> {
    return await this.repository
      .find()
      .then((result) => result)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async postData(data: T): Promise<T | void> {
    return this.repository
      .save(data)
      .then((result) => result)
      .catch((error) => {
        if (error.code === '23503') {
          throw new Error(
            `${error.detail} ${MESSAGE.FOREIGN_KEY_VIOLATE}${this.tableName}`,
          );
        }
        if (error.code === '23505') {
          throw new Error(
            `${error.detail} ${MESSAGE.UNIQUE_VIOLATE}${this.tableName}`,
          );
        }
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
      .then((result) => {
        if (result.affected) {
          return result;
        }
        throw new Error(`${MESSAGE.NOT_FOUND} in ${this.tableName}`);
      })
      .catch((error) => {
        if (error.code === '23503') {
          throw new Error(
            `${error.detail} ${MESSAGE.FOREIGN_KEY_VIOLATE}${this.tableName}`,
          );
        }
        if (error.code === '23505') {
          throw new Error(
            `${error.detail} ${MESSAGE.UNIQUE_VIOLATE}${this.tableName}`,
          );
        }
        throw new Error(error);
      });
  }

  async postDataWithTransaction(data: T): Promise<any> {
    return await this.repository.manager.transaction(
      async (transactionManager: EntityManager) => {
        return await transactionManager
          .save(data)
          .then((result) => result)
          .catch((error) => {
            if (error.code === '23503') {
              throw new Error(
                `${error.detail} ${MESSAGE.FOREIGN_KEY_VIOLATE}${this.tableName}`,
              );
            }
            if (error.code === '23505') {
              throw new Error(
                `${error.detail} ${MESSAGE.UNIQUE_VIOLATE}${this.tableName}`,
              );
            }
            throw new Error(error);
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
          .then((result) => {
            if (result.affected) {
              return result;
            }
            throw new Error(`${MESSAGE.NOT_FOUND} in ${this.tableName}`);
          })
          .catch((error) => {
            if (error.code === '23503') {
              throw new Error(
                `${error.detail} ${MESSAGE.FOREIGN_KEY_VIOLATE}${this.tableName}`,
              );
            }
            if (error.code === '23505') {
              throw new Error(
                `${error.detail} ${MESSAGE.UNIQUE_VIOLATE}${this.tableName}`,
              );
            }
            throw new Error(error);
          });
      },
    );
  }
}
