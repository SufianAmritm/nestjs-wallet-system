import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CoinTransactionSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  id?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  debitAmount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  creditAmount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  coinsId?: number;
  @IsBoolean()
  @IsNotEmpty()
  credit?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  debit?: boolean;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  openingCoinsAmount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  closingCoinsAmount?: number;
}
