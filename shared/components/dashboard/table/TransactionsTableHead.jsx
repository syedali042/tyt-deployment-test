// React Bootstrap
import {Row, Col, ButtonGroup, Stack, Dropdown} from 'react-bootstrap';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getActiveType, setActiveType} from '../../../redux/slices/transaction';
// Constants
import {TRANSACTION_TYPES} from '@/shared/constants';

const TransactionsTableHead = () => {
  const dispatch = useDispatch();
  const activeType = useSelector(getActiveType);
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
                  {Object.keys(TRANSACTION_TYPES).map((key) => {
                    return (
                      <>
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(
                              setActiveType(TRANSACTION_TYPES[key].value)
                            );
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
