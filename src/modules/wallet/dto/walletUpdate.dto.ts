import { IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class WalletUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  balance?: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  userId?: number;
}
