import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CoinsDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  userId: number;
}
