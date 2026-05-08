import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 3; // Show 3 pages on mobile
    
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button 
                className="pagination-btn" 
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                title="First Page"
            >
                «
            </button>
            <button 
                className="pagination-btn" 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ‹
            </button>
            
            <div className="pagination-numbers">
                {start > 1 && <span className="pagination-ellipsis">...</span>}
                {pages.map(page => (
                    <button 
                        key={page} 
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
                {end < totalPages && <span className="pagination-ellipsis">...</span>}
            </div>

            <button 
                className="pagination-btn" 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                ›
            </button>
            <button 
                className="pagination-btn" 
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                title="Last Page"
            >
                »
            </button>
        </div>
    );
}

export default Pagination;
