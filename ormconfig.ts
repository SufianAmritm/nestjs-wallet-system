import config from './src/common/config/index';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  database: config.database.database,
  password: config.database.password,
  schema: 'public',
  logging: false,
  synchronize: false,

  migrations: ['src/common/migrations/**/*{.ts,.js}'],
});

export default dataSource;
