import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidationClass {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;
  @IsString()
  @IsNotEmpty()
  DB_NAME: string;
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;
  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;
  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;
  @IsString()
  @IsNotEmpty()
  DB_SCHEMA: string;
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;
}
