import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class WalletTransactionCreditUpdateDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  freeCredit?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  paidCredit?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  coinConversion?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  refund?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  cashPaidToDeliveryAgent?: boolean;
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  unfullfillment?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  partialAcceptance?: boolean;
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  IBillTopUp?: boolean;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
  transactionId?: number;
}
