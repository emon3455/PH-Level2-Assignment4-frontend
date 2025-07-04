import React from 'react';

const Pagination = ({ page, setPage, totalPages }:any) => {
  const visiblePages = Math.min(totalPages, 5);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => setPage((prev:number) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {Array.from({ length: visiblePages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`w-10 h-10 rounded-lg ${
                page === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {totalPages > visiblePages && (
          <>
            <span className="px-2 py-2 text-gray-500">...</span>
            <button
              onClick={() => setPage(totalPages)}
              className={`w-10 h-10 rounded-lg ${
                page === totalPages
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => setPage((prev:number) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
