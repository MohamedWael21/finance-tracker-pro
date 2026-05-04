export interface Pagination {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number | null;
  prevPage?: number | null;
}

export interface PaginatedResponse<T> {
  docs: T[];
  pagination: Pagination;
}
