'use client';
import {Form, InputGroup} from 'react-bootstrap';
import {Stack, Row, Col, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';

import {suggestedAmounts} from '@/shared/constants';

const SelectAmountTab = ({tabSettings}) => {
  const dispatch = useDispatch();

  return (
    <Stack
      className={`${tabSettings.active !== 'select-amount-tab' && 'd-none'}`}
    >
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
                style={{
                  padding: '15px',
                  fontSize: '16px',
                }}
                min={1}
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
                    document.querySelector('#tip-amount').focus();
                  } else {
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
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
            }}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </Stack>
  );
};

export default SelectAmountTab;
