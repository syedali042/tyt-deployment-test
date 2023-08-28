'use client';
// React
import {useState, useEffect} from 'react';
// React Bootstrap
import {Row, Card, Col, Stack, Table} from 'react-bootstrap';
import 'react-data-table-component-extensions/dist/index.css';
// MUI
import {Pagination} from '@mui/material';
// Redux
import {useSelector} from 'react-redux';
import {getTransactions} from '@/shared/redux/slices/transaction';
// Components
import TransactionsTableHead from './TransactionsTableHead';
import TransactionsTableRow from './TransactionsTableRow';
import {TransactionsGroupModal} from './TransactionsGroupModal';

export const TransactionsTable = () => {
  const transactions = useSelector(getTransactions({filterByActiveType: true}));

  const [sortedTransactions, setSortedTransactions] = useState([]);

  const [transactionsModalShow, setTransactionsModalShow] = useState(false);

  const [groupId, setGroupId] = useState(false);

  useEffect(() => {
    let sortedTransactionsArr = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedTransactions(sortedTransactionsArr);
  }, [transactions]);

  const itemsPerPage = 10;

  const pageCount = Math.ceil(sortedTransactions?.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentData = sortedTransactions?.slice(startIndex, endIndex);

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
                    {sortedTransactions?.length > 0 ? (
                      currentData.map((item, index) => (
                        <TransactionsTableRow
                          item={item}
                          index={index}
                          key={index}
                          onClick={() => {
                            setGroupId(item?.groupId);
                            setTransactionsModalShow(true);
                          }}
                        />
                      ))
                    ) : (
                      <Stack style={{textAlign: 'center', padding: 15}}>
                        No Transaction Found
                      </Stack>
                    )}
                    <TransactionsGroupModal
                      show={transactionsModalShow}
                      onHide={() => setTransactionsModalShow(false)}
                      groupid={groupId}
                    />
                  </tbody>
                </Table>
              </div>
            </Stack>
            <div className="d-flex align-items-center justify-content-end mt-5">
              <Pagination
                component={'div'}
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={'large'}
                showFirstButton={true}
                showLastButton={true}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
