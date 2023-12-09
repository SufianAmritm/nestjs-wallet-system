import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class WalletTransactionReasonUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  reason?: string;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  transactionId?: number;
}
