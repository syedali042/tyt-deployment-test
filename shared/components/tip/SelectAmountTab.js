'use client';
// React Bootstrap
import {Form, InputGroup, Stack, Row, Col, Button} from 'react-bootstrap';
// Mui
import {CircularProgress} from '@mui/material';
import {ThumbUpAltOutlined, Info as InfoIcon} from '@mui/icons-material';
// React Toast
import {toast} from 'react-toastify';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getTipAmount,
  setTipAmount,
  initializeOrUpdateTipProcess,
  getIsPaymentRequestLoading,
  getCurrentTeacher,
  getClientSecret,
  getActiveStep,
} from '@/shared/redux/slices/tip';
// Components
import TipMessage from './TipMessage';
// Constants
import {
  TIP_MESSAGES,
  suggestedAmounts,
  toastSettings,
} from '@/shared/constants';

const SelectAmountTab = () => {
  const isLoading = useSelector(getIsPaymentRequestLoading);
  const dispatch = useDispatch();
  const amount = useSelector(getTipAmount);
  const activeStep = useSelector(getActiveStep);
  const currentTeacher = useSelector(getCurrentTeacher);
  const clientSecret = useSelector(getClientSecret);

  const handleAmountChange = (value) => dispatch(setTipAmount({amount: value}));

  const handleEnterKeyPressEvent = async (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      await initializeCheckout();
    }
  };

  const initializeCheckout = async () => {
    if (amount < 15)
      return toast.error(
        'Amount must be greater than or equall to 15',
        toastSettings
      );
    if (clientSecret !== '') {
      await dispatch(initializeOrUpdateTipProcess({action: 'noUpdate'}));
    } else {
      await dispatch(
        initializeOrUpdateTipProcess({action: 'initializeCheckout'})
      );
    }
  };

  return (
    <Stack className={`${activeStep !== 2 && 'd-none'}`}>
      {currentTeacher?.verified ? (
        <TipMessage
          icon={<ThumbUpAltOutlined />}
          message={TIP_MESSAGES.verifiedTeacherMessage({
            displayName: currentTeacher?.displayName,
            username: currentTeacher?.username,
          })}
          onClick={() => {
            return;
          }}
        />
      ) : (
        <TipMessage
          icon={<InfoIcon />}
          message={TIP_MESSAGES.nonExistedTeacherMessage({
            email: currentTeacher?.email,
          })}
          onClick={() => {
            return;
          }}
        />
      )}
      <Row>
        <Col md={{span: 12, offset: 0}} lg={{span: 3, offset: 2}}>
          <Form.Label style={{color: '#fff'}}>
            {'Enter amount you want to tip'}
          </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col md={{span: 5, offset: 0}} lg={{span: 3, offset: 2}}>
          <Form.Group className="text-start form-group" controlId="">
            <InputGroup>
              <Form.Control
                className="form-control"
                placeholder={'Amount'}
                type={'number'}
                id="tip-amount"
                value={amount}
                onChange={(event) => handleAmountChange(event.target.value)}
                style={{
                  padding: '15px',
                  fontSize: '16px',
                }}
                onKeyDown={handleEnterKeyPressEvent}
                min={15}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={7} lg={5}>
          <Row style={{rowGap: 5}}>
            {suggestedAmounts.map((amount) => (
              <Col
                md={3}
                sm={3}
                onClick={() => {
                  if (amount == 'Other') {
                    handleAmountChange(0);
                    document.querySelector('#tip-amount').focus();
                  } else {
                    handleAmountChange(amount);
                    document.querySelector('#tip-amount').focus();
                  }
                }}
              >
                <div
                  className="text-center p-2"
                  style={{
                    height: '50px',
                    fontSize: '21px',
                    transform: 'translateY(5%)',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    backgroundColor: '#3E7599',
                    cursor: 'pointer',
                  }}
                >
                  {amount}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={{span: 2, offset: 5}}>
          <Button
            variant="secondary"
            onClick={() => initializeCheckout()}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
            }}
          >
            {isLoading ? (
              <CircularProgress
                sx={{transaform: 'translateY(10%)'}}
                size={'20px'}
                color="inherit"
              />
            ) : (
              'Continue'
            )}
          </Button>
        </Col>
      </Row>
    </Stack>
  );
};

export default SelectAmountTab;
