import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CoinTransactionUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  credit?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  debit?: boolean;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  coinsId?: number;
}
