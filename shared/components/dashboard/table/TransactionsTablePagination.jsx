// React Bootstrap
import {Pagination} from 'react-bootstrap';

const TransactionsTablePagination = ({
  handlePageChange,
  currentPage,
  pageCount,
}) => {
  return (
    <center>
      <div className="d-flex align-items-center justify-content-end mt-3">
        <Pagination size="sm" style={{overflowX: 'scroll'}}>
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />

          {[...Array(pageCount)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={currentPage === pageCount}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>
      </div>
    </center>
  );
};

export default TransactionsTablePagination;
