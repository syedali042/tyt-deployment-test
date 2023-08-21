import {getTransactions} from '@/shared/redux/slices/transaction';
import {useSelector} from 'react-redux';
import {Modal, Button, Card, Row, Col} from 'react-bootstrap';
import {TRANSACTION_STATUS, TRANSACTION_TYPES} from '@/shared/constants';
import {Typography} from '@mui/material';

export const TransactionsGroupModal = (props) => {
  const {groupid} = props;
  const transactions = useSelector(getTransactions({filterByGroupId: groupid}));
  const modalSize = () => decideSizeOrColumns().size;
  const cardColumns = () => decideSizeOrColumns().columns;
  const decideSizeOrColumns = () => {
    let result;
    switch (transactions?.length) {
      case 3:
        result = {size: 'xl', columns: 4};
        break;
      case 2:
        result = {size: 'lg', columns: 6};
        break;
      default:
        result = {size: 'md', columns: 12};
    }
    return result;
  };
  return (
    <Modal
      {...props}
      size={modalSize()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Transaction Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {transactions.map((transaction) => {
            return (
              <Col key={transaction?.id} md={cardColumns()}>
                <Card className={`p-3 bg-light`}>
                  <div className="my-4 d-flex align-items-center justify-content-between">
                    <div>
                      {TRANSACTION_TYPES[transaction?.type.toLowerCase()].icon}{' '}
                    </div>
                    <div style={{transform: 'translateY(15%)'}}>
                      <i
                        className={`fa fa-circle text-${
                          TRANSACTION_STATUS[transaction?.status].color
                        }`}
                      ></i>{' '}
                      {TRANSACTION_STATUS[transaction?.status].label}
                    </div>
                  </div>
                  <div className="my-4 d-flex align-items-center justify-content-between">
                    <div>
                      <strong>Amount:</strong> ${transaction?.amount}
                    </div>
                    <div>
                      {new Date(transaction?.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  {transaction?.notes && (
                    <div>
                      <Typography fontWeight={400} fontSize={14}>
                        Notes: {transaction?.notes}
                      </Typography>
                    </div>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
