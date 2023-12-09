import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WalletTransactionCreditDto {
  @IsBoolean()
  @IsNotEmpty()
  freeCredit: boolean;
  @IsBoolean()
  @IsNotEmpty()
  paidCredit: boolean;
  @IsBoolean()
  @IsNotEmpty()
  coinConversion: boolean;
  @IsBoolean()
  @IsNotEmpty()
  refund: boolean;
  @IsBoolean()
  @IsNotEmpty()
  cashPaidToDeliveryAgent: boolean;
  @IsBoolean()
  @IsNotEmpty()
  unfullfillment: boolean;
  @IsBoolean()
  @IsNotEmpty()
  partialAcceptance: boolean;
  @IsBoolean()
  @IsNotEmpty()
  IBillTopUp: boolean;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  transactionId: number;
}
