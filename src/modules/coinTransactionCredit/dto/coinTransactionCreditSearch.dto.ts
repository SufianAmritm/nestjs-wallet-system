import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CoinTransactionCreditSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  coinSku?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  coinConversion?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  transactionId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
}
