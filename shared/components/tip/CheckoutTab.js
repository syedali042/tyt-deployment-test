'use client';
import '../../../app/tip/page.css';
// React
import {useState} from 'react';
//Bootstrap
import {Stack, Row, Col, Card, Form, InputGroup, Badge} from 'react-bootstrap';
import {Typography} from '@mui/material';
// Stripe
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
// Component
import CheckoutForm from './CheckoutForm';
// Redux
import {useSelector} from 'react-redux';
import {
  getClientSecret,
  getCurrentTeacher,
  getTipAmount,
} from '@/shared/redux/slices/tip';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutTab = ({tabSettings}) => {
  const [notes, setNotes] = useState('');
  const currentTeacher = useSelector(getCurrentTeacher);
  const amount = useSelector(getTipAmount);

  const appearance = {
    theme: 'stripe',
    labels: 'floating',
  };

  const clientSecret = useSelector(getClientSecret);

  const options = {
    clientSecret: clientSecret,
    appearance,
  };

  return (
    <>
      <Stack className={`${tabSettings.active !== 'checkout-tab' && 'd-none'}`}>
        <Row>
          <Col lg={{span: 4, offset: 1}}>
            <Row className="px-3">
              <Card>
                <Card.Header style={{backgroundColor: '#BF4D4D'}}>
                  <Card.Title className="text-white">Tip Details</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    {currentTeacher?.displayName && (
                      <>
                        <Col md={5} className="py-1">
                          <strong>Teacher&apos;s Name</strong>
                        </Col>
                        <Col md={7} className="text-md-end py-1">
                          Syed Ali
                        </Col>
                      </>
                    )}
                    <Col md={5} className="py-1">
                      <strong>Teacher&apos;s Email</strong>
                    </Col>
                    <Col md={7} className="text-md-end py-1">
                      <Typography
                        style={{transform: 'translateY(10%)'}}
                        fontSize={12}
                      >
                        {currentTeacher?.email}
                      </Typography>
                    </Col>
                    <Col md={5} className="py-1">
                      <strong>Amount to tip</strong>
                    </Col>
                    <Col md={7} className="text-md-end py-1">
                      <Typography
                        style={{transform: 'translateY(10%)'}}
                        fontSize={12}
                      >
                        ${amount}
                      </Typography>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Form.Group
                    className="text-start form-group pt-2"
                    controlId=""
                  >
                    <InputGroup>
                      <Form.Control
                        placeholder={`Write your note to ${
                          currentTeacher?.displayName || 'the teacher'
                        }...`}
                        rows={3}
                        name="Note"
                        as={'textarea'}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="form-control"
                        style={{
                          padding: '15px',
                          fontSize: '16px',
                          border: '2px solid #BF4D4D !important',
                        }}
                        min={1}
                      />
                    </InputGroup>
                  </Form.Group>
                </Card.Footer>
              </Card>
            </Row>
          </Col>
          <Col md={{span: 10}} lg={{span: 6}}>
            {clientSecret !== '' ? (
              <>
                <div>
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm notes={notes} />
                  </Elements>
                </div>
              </>
            ) : (
              'Something went Wrong'
            )}
          </Col>
        </Row>
      </Stack>
    </>
  );
};
export default CheckoutTab;
