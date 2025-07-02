export interface IBorrow {
  _id: string
  book: string
  quantity: number
  dueDate: string
  createdAt?: string
  updatedAt?: string
}

export interface IBorrowSummary {
  _id: string // book ID
  title: string
  isbn: string
  totalBorrowed: number
}
