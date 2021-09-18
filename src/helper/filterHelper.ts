export interface FilterHelper<T> {
  data?: T;
  includes?: [];
  count?: number;
  desc?: 'ASC' | 'DESC' | 1 | -1;
}
