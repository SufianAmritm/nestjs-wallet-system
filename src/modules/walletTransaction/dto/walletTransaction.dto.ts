import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class WalletTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  creditAmount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  debitAmount?: number;
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
