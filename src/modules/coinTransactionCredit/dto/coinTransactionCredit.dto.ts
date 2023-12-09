import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CoinTransactionCreditDto {
  @IsBoolean()
  @IsNotEmpty()
  coinConversion: boolean;
  @IsBoolean()
  @IsNotEmpty()
  coinSku: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  transactionId: number;
}
