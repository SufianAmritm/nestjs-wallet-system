import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class WalletTransactionReasonDto {
  @IsString()
  @IsNotEmpty()
  reason: string;
  @IsNumber()
  @IsNotEmpty()
  transactionId: number;
}
