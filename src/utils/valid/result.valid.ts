import { MESSAGE } from 'src/common/customMessages/index';
export function validResult<T>(result: T, tableName: string): T {
  if (Array.isArray(result) && result.length > 0) {
    return result;
  } else {
    throw new Error(`${MESSAGE.NOT_FOUND} in ${tableName}`);
  }
}
