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
export class CitySearchDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  id?: number;
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
  countryId?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  keyword?: string;
}
