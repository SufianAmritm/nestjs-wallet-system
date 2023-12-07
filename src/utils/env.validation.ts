import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ValidationClass } from 'src/common/config/env.validationClass';

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToInstance(ValidationClass, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    if (validatedConfig.NODE_ENV === 'development') {
      throw new Error(errors.toString());
    } else {
      throw new Error(
        'An error related to secure variables occured while bootstraping. Please refer to the production team',
      );
    }
  }
  return config;
}
