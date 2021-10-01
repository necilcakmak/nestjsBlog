export class FilterHelper<T> {
  data?: T;
  includes?: string[];
  count?: number;
  desc?: 'ASC' | 'DESC' | 1 | -1;
}
