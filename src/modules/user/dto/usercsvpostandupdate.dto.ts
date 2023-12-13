import {
  IsNotEmpty,
  IsString,
  IsAlpha,
  Matches,
  IsNumber,
  Min,
} from 'class-validator';
import { MESSAGE } from 'src/common/customMessages';

export class UserCsvPostAndUpdateDto {
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
  cityId: number;
}
