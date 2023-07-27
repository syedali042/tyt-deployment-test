'use client';
// React
import {useState, useEffect} from 'react';
// React Bootstrap
import {Row, Card, Col, Stack, Table} from 'react-bootstrap';
import 'react-data-table-component-extensions/dist/index.css';
// Redux
import {useSelector} from 'react-redux';
import {getTransactions} from '@/shared/redux/slices/transaction';
// Components
import TransactionsTableHead from './TransactionsTableHead';
import TransactionsTablePagination from './TransactionsTablePagination';
import TransactionsTableRow from './TransactionsTableRow';

export const TransactionsTable = () => {
  const transactions = useSelector(getTransactions({filterByActiveType: true}));

  const itemsPerPage = 10;

  const pageCount = Math.ceil(transactions?.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentData = transactions?.slice(startIndex, endIndex);

  return (
    <Row>
      <Col sm={12}>
        <Card>
          <Card.Body className="pt-4">
            <TransactionsTableHead />
            <Stack className="inbox-body">
              <div className="table-responsive">
                <Table className="table-inbox table-hover text-nowrap mb-0">
                  <tbody>
                    {transactions?.length > 0 ? (
                      currentData.map((item, index) => (
                        <TransactionsTableRow
                          item={item}
                          index={index}
                          key={index}
                        />
                      ))
                    ) : (
                      <Stack style={{textAlign: 'center', padding: 15}}>
                        No Transaction Found
                      </Stack>
                    )}
                  </tbody>
                </Table>
              </div>
            </Stack>
            <TransactionsTablePagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              pageCount={pageCount}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
