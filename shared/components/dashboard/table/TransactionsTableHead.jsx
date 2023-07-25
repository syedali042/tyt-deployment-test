// React Bootstrap
import {Row, Col, ButtonGroup, Stack, Dropdown} from 'react-bootstrap';
// Constants
import {TRANSACTION_TYPES} from '@/shared/constants';
// Dummy Data ====> Will be replaced by redux selector later
import {TRANSACTIONS} from './data';

const TransactionsTableHead = ({
  setTransactionsArr,
  setActiveType,
  activeType,
}) => {
  const transactions = TRANSACTIONS;
  return (
    <Row>
      <Col md={8} sm={6}>
        <h5 className="p-2">
          <b>All Transactions</b>
        </h5>
      </Col>
      <Col md={4} sm={6} className="text-end">
        <div className="mail-option">
          <div className="chk-all">
            <ButtonGroup>
              <Dropdown className="Inbox-mail">
                <Dropdown.Toggle
                  className="p-0 bg-transparent border-0"
                  variant="light"
                  size="sm"
                >
                  {activeType}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setTransactionsArr(transactions);
                      setActiveType('All');
                    }}
                  >
                    All
                  </Dropdown.Item>
                  {Object.keys(TRANSACTION_TYPES).map((key) => {
                    return (
                      <>
                        <Dropdown.Item
                          onClick={() => {
                            setTransactionsArr(
                              transactions.filter(
                                (transaction) =>
                                  transaction.type.toLowerCase() ==
                                  TRANSACTION_TYPES[key].value
                              )
                            );
                            setActiveType(TRANSACTION_TYPES[key].label);
                          }}
                        >
                          {' '}
                          {TRANSACTION_TYPES[key].label}
                        </Dropdown.Item>
                      </>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TransactionsTableHead;
