import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleNextbtn = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (currentPage > 1 && currentPage > pageNumberLimit) {
      pages.push(
        <button
          key="first"
          className="btn btn-sm btn-square shadow-md rounded-md bg-red-950 dark:bg-gray-700 hover:bg-red-900 dark:hover:bg-gray-700 hover:text-white"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      pages.push(<span key="ellipsis1" className="ellipsis text-gray-500 dark:text-gray-300">...</span>);
    }

    for (let i = Math.max(currentPage - 2, 1); i <= Math.min(currentPage + 2, totalPages); i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-sm btn-square shadow-md rounded-md ${currentPage === i ? "bg-red-900 text-white dark:bg-gray-500 hover:bg-amber-600" : "bg-white text-black dark:bg-gray-700 hover:bg-red-800 dark:hover:bg-gray-600 hover:text-white"}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2 && totalPages > pageNumberLimit) {
      pages.push(<span key="ellipsis2" className="ellipsis text-gray-500 dark:text-gray-300">...</span>);
      pages.push(
        <button
          key="last"
          className="btn btn-sm btn-square shadow-md rounded-md bg-red-900 dark:bg-gray-700 hover:bg-red-800 dark:hover:bg-gray-600 hover:text-white"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  }

  return (
    <div className="pagination gap-2 flex justify-center mt-5 w-full bottom-5 fixed">
      <button
        className={`btn btn-sm bg-white dark:bg-gray-700 btn-square shadow-md rounded-md hover:bg-red-800 dark:hover:bg-gray-600 hover:text-white ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrevbtn}
        disabled={currentPage === 1}
      >
        «
      </button>
      {renderPageNumbers()}
      <button
        className={`btn btn-sm bg-white dark:bg-gray-700 btn-square shadow-md rounded-md hover:bg-red-800 dark:hover:bg-gray-600 hover:text-white ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={handleNextbtn}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  )
};

export default Pagination;