export interface Pageable {
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: false;
}
