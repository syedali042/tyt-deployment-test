'use client';
// React
import {useState} from 'react';
// React Bootstrap
import {Row, Card, Col, Stack, Table} from 'react-bootstrap';
import 'react-data-table-component-extensions/dist/index.css';
// Components
import TransactionsTableHead from './TransactionsTableHead';
import TransactionsTablePagination from './TransactionsTablePagination';
import TransactionsTableRow from './TransactionsTableRow';
// Dummy Data ====> Will be replaced by redux selector later
import {TRANSACTIONS} from './data';

export const TransactionsTable = () => {
  const transactions = TRANSACTIONS;

  const [transactionsArr, setTransactionsArr] = useState(transactions);

  const [activeType, setActiveType] = useState('All');

  const itemsPerPage = 10;

  const pageCount = Math.ceil(transactionsArr.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentData = transactionsArr.slice(startIndex, endIndex);

  return (
    <Row>
      <Col sm={12}>
        <Card>
          <Card.Body className="pt-4">
            <TransactionsTableHead
              activeType={activeType}
              setActiveType={setActiveType}
              setTransactionsArr={setTransactionsArr}
            />
            <Stack className="inbox-body">
              <div className="table-responsive">
                <Table className="table-inbox table-hover text-nowrap mb-0">
                  <tbody>
                    {transactionsArr.length > 0 ? (
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
