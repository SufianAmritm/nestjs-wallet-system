import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class WalletTransactionSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  id?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  walletId?: number;
  @IsBoolean()
  @IsNotEmpty()
  credit?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  debit?: boolean;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  openingWalletBalance?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  closingWalletBalance?: number;
}
