import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class WalletTransactionDebitUpdateDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  usageAtCheckout?: boolean;
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
  @Min(1)
  transactionId?: number;
}
