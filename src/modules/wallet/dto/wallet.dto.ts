import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WalletDto {
  @IsNumber()
  @IsNotEmpty()
  balance: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  userId: number;
}
