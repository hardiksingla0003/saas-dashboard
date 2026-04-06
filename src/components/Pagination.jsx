const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  indexOfFirst,
  indexOfLast,
  onPageChange,
}) => {
  if (totalItems === 0) return null;
  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600">
        Showing {totalItems === 0 ? 0 : indexOfFirst + 1}-
        {Math.min(indexOfLast, totalItems)} of {totalItems} users
      </p>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border rounded cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => {
            onPageChange(Math.max(currentPage - 1, 1));
          }}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            disabled={currentPage === i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 border rounded cursor-pointer ${currentPage === i + 1 ? "bg-indigo-600 text-white" : ""} `}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => {
            onPageChange(Math.min(currentPage + 1, totalPages));
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
