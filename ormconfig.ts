import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  autoLoadEntities:true,
  synchronize: true,
  entities: ['dist/src/entity/*.js'],

  migrations: ['dist/src/migration/*.js'],

  cli: {
    migrationsDir: 'src/migration',
  },
};

export default config;
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'; mysql calistir
