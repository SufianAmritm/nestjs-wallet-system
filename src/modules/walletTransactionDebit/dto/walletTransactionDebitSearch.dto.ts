import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class WalletTransactionDebitSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  usageAtCheckout?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  cancelled?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  fraud?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  reversal?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  creditExpired?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  transactionId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
}
