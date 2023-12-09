import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CoinTransactionDebitSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  coinConversion?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  transactionId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
}
