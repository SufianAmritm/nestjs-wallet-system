import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUppercase,
  Matches,
  Min,
} from 'class-validator';
import { MESSAGE } from '../../../common/customMessages/index';
export class CountryUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
  @Matches(/^[A-Z]/, {
    message: MESSAGE.TITLE_CASE,
  })
  name?: string;
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsUppercase()
  @IsOptional()
  @Matches(/\b[A-Z]{3}\b/, { message: MESSAGE.MATCH_ISO })
  currency?: string;
}
