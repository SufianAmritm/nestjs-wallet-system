import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CoinTransactionDebitDto {
  @IsBoolean()
  @IsNotEmpty()
  coinConversion: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  transactionId: number;
}
