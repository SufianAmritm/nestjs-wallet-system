import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import config from '../config/index';
('@nestjs/typeorm');
@Injectable()
export class DatabaseModule implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      database: config.database.database,
      password: config.database.password,
      schema: config.database.schema,
      migrations: ['src/migrations/*.ts'],
      keepConnectionAlive: true,
      autoLoadEntities: true,
      logging: true,

      extra: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
      },
    } as TypeOrmModuleOptions;
  }
}
