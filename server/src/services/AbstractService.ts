import { FindOptionsOrder } from 'typeorm';

export abstract class AbstractService {
  static parseSort(sort?: string): FindOptionsOrder<any> | undefined {
    if (!sort) {
      return undefined;
    }

    if (sort.startsWith('-')) {
      return { [sort.substring(1)]: 'desc' };
    } else {
      return { [sort]: 'asc' };
    }
  }
}
