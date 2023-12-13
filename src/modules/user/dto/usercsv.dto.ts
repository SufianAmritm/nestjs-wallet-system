import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsAlpha,
  Matches,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { OPERATION } from 'src/common/customMessages';
import { MESSAGE } from 'src/common/customMessages';

export class UserCsvDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(OPERATION, { each: true })
  operation: OPERATION;
}
