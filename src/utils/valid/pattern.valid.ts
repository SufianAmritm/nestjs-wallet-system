import { MESSAGE } from 'src/common/customMessages/index';
export function patternValid<T>(pattern: T, tableName: string): void {
  if (Object.keys(pattern).length === 0) {
    throw new Error(`${MESSAGE.EMPTY_SEARCH_QUERY} in ${tableName}`);
  }
}
