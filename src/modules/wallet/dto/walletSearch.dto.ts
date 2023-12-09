import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsString,
} from 'class-validator';

export class WalletSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  id?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  balance?: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  userId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
}
