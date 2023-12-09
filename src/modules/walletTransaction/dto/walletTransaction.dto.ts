import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WalletTransactionDto {
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
  walletId: number;
}
