import { MESSAGE } from 'src/common/customMessages/index';

export async function dbError(error: any): Promise<void> {
  if (error.code === '23503') {
    throw new Error(
      `${error.detail} ${MESSAGE.FOREIGN_KEY_VIOLATE}${this.tableName}`,
    );
  }
  if (error.code === '23505') {
    throw new Error(
      `${error.detail} ${MESSAGE.UNIQUE_VIOLATE}${this.tableName}`,
    );
  }
}
