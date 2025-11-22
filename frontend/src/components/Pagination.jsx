import React from 'react';
import { useAppContext } from '../context/AppContext';
import './Pagination.css';

const Pagination = () => {
  const { currentPage, getTotalPages, goToPage, nextPage, prevPage } = useAppContext();

  const totalPages = getTotalPages();

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <span key="ellipsis" className="ellipsis">
          »
        </span>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="nav-btn"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="page-numbers">
        {renderPageNumbers()}
      </div>

      <button
        className="nav-btn"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
