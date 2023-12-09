export interface IWrite<T> {
  postData(data: T): Promise<T>;
  postDataWithTransaction(data: T): Promise<T>;
}
