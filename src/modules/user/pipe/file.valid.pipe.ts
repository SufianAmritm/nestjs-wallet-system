import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileExtensionTypeValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new Error('File is required');
    }
    const originalName = value.originalname;
    const fileExtension = extname(originalName).toLowerCase();
    if (fileExtension !== '.csv') {
      throw new Error('File type is not supported');
    }
    return value;
  }
}
