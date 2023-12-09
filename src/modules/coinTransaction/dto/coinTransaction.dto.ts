import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CoinTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  debitAmount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  creditAmount?: number;
  @IsBoolean()
  @IsNotEmpty()
  credit: boolean;
  @IsBoolean()
  @IsNotEmpty()
  debit: boolean;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  coinsId: number;
}
