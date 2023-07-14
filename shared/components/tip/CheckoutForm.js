import React from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import {Button, Col, Row} from 'react-bootstrap';

export default function CheckoutForm() {
  const paymentElementOptions = {
    layout: 'tabs',
  };
  return (
    <>
      <form id="payment-form" className="d-flex flex-column align-items-center">
        <LinkAuthenticationElement
          id="link-authentication-element"
          className="w-100 text-white pb-3"
        />
        <PaymentElement
          className="w-100 text-white "
          id="payment-element"
          options={paymentElementOptions}
        />
      </form>
      <Row className="pt-3">
        <Col md={{span: 12}}>
          <Button
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
            }}
          >
            Pay Now
          </Button>
        </Col>
      </Row>
    </>
  );
}
