import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WalletTransactionDebitDto {
  @IsBoolean()
  @IsNotEmpty()
  usageAtCheckout: boolean;
  @IsBoolean()
  @IsNotEmpty()
  cancelled: boolean;
  @IsBoolean()
  @IsNotEmpty()
  fraud: boolean;
  @IsBoolean()
  @IsNotEmpty()
  reversal: boolean;
  @IsBoolean()
  @IsNotEmpty()
  creditExpired: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  transactionId: number;
}
