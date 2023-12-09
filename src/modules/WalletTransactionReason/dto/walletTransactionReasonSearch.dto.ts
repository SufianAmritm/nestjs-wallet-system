import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class WalletTransactionReasonSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  reason?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  transactionId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsOptional()
  keyword?: string;
}
