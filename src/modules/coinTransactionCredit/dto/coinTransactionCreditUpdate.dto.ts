import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CoinTransactionCreditUpdateDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  coinSku?: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  coinConversion?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Min(1)
  transactionId?: number;
}
