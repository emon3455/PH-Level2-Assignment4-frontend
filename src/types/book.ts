export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBookResponse {
  books: IBook[];
  meta: {
    total: number;
    limit: number;
    page: number;
  };
}
