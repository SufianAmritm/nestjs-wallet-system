import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Matches,
} from 'class-validator';
import { MESSAGE } from 'src/common/customMessages/index';

export class CityDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @Matches(/^[A-Z]/, {
    message: MESSAGE.TITLE_CASE,
  })
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  countryId: number;
}
