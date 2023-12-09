import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Matches,
} from 'class-validator';
import { MESSAGE } from 'src/common/customMessages/index';
export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
  @Matches(/^[A-Z]/, {
    message: MESSAGE.TITLE_CASE,
  })
  name?: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  cityId?: number;
}
