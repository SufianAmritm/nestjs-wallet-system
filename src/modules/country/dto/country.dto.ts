import {
  IsAlpha,
  IsNotEmpty,
  IsString,
  IsUppercase,
  Matches,
} from 'class-validator';
import { MESSAGE } from '../../../common/customMessages/index';
export class CountryDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @Matches(/^[A-Z]/, {
    message: MESSAGE.TITLE_CASE,
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsUppercase()
  @Matches(/\b[A-Z]{3}\b/, { message: MESSAGE.MATCH_ISO })
  currency: string;
}
