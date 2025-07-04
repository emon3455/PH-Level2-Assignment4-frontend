import { useGetBorrowSummaryQuery } from "../redux/features/borrow/borrowApiSlice"
import { BookOpen, Hash, TrendingUp, Loader2 } from "lucide-react"

const BorrowSummaryPage = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-medium">Loading borrow summary...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const totalBooks = data?.reduce((sum, item) => sum + item.totalQuantity, 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Borrow Summary</h1>
              <p className="text-gray-600 mt-1">Overview of all borrowed books and their quantities</p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Books Borrowed</p>
                  <p className="text-2xl font-bold text-gray-800">{totalBooks}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium">Unique Book</p>
                <p className="text-2xl font-bold text-indigo-600">{data?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item?.totalQuantity} borrowed
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight">{item?.book?.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm font-medium">ISBN: {item?.book?.isbn}</span>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Quantity</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-lg font-bold text-gray-800">{item?.totalQuantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!data || data.length === 0) && !isLoading && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No borrowed books found</h3>
            <p className="text-gray-500">There are currently no books in the borrow summary.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BorrowSummaryPage
