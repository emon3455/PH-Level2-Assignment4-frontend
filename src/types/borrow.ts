export interface IBorrow {
  _id: string
  book: string
  quantity: number
  dueDate: string
  createdAt?: string
  updatedAt?: string
}

export interface IBorrowSummary {
  totalQuantity: number
  book: any
  _id: string
}
