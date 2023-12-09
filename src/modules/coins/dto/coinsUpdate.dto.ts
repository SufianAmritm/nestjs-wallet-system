import { IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CoinsUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  userId?: number;
}
