import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsString,
} from 'class-validator';

export class CoinsSearchDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  id?: number;
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;
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
