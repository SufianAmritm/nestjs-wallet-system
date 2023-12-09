import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class WalletTransactionCreditSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id?: number;
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
  transactionId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
}
