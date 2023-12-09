import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CoinTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
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
