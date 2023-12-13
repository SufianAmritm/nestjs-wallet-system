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
export class CountrySearchDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @Matches(/^[A-Z]/, {
    message: MESSAGE.TITLE_CASE,
  })
  @IsOptional()
  name?: string;
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @IsUppercase()
  @Matches(/\b[A-Z]{3}\b/, { message: MESSAGE.MATCH_ISO })
  @IsOptional()
  currency?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
}
