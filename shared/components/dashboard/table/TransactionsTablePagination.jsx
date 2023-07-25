// React Bootstrap
import {Pagination} from 'react-bootstrap';

const TransactionsTablePagination = ({
  handlePageChange,
  currentPage,
  pageCount,
}) => {
  return (
    <div className="d-flex align-items-center justify-content-end mt-3">
      <center>
        <Pagination>
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
      </center>
    </div>
  );
};

export default TransactionsTablePagination;
