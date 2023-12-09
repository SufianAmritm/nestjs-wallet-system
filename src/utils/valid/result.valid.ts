import { MESSAGE } from 'src/common/customMessages/index';
export function resultValid<T>(result: T, tableName: string): T | void {
  if (Array.isArray(result) && result.length > 0) {
    return result;
  } else {
    throw new Error(`${MESSAGE.NOT_FOUND} in ${tableName}`);
  }
}
