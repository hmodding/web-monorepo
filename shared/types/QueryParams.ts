interface BaseQueryParams {
  sort?: string;
  search?: string;
  q?: string | null;
  filter?: string;
}

export interface QueryParams extends BaseQueryParams {
  [key: string]: any;
}

export interface ModQueryParams extends BaseQueryParams {
  author?: string;
}
