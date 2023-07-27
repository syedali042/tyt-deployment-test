'use client';
import React from 'react';
import {useDispatch} from 'react-redux';
import {Stack, Card, Image} from 'react-bootstrap';
import {getVerificationURL} from '@/shared/redux/slices/user';

const PaymentAccounts = () => {
  const dispatch = useDispatch();
  const handleGetVerify = () => {
    dispatch(getVerificationURL());
  };
  return (
    <Card className="overflow-hidden">
      <Stack className="m-5 number-font">Payment Accounts</Stack>
      <Card.Body className="pt-0">
        <Stack
          className="bg-light p-3"
          style={{borderRadius: 12, cursor: 'pointer'}}
          onClick={handleGetVerify}
        >
          <Stack className="d-flex justify-content-between">
            <Image
              src={'/assets/images/payments/stripe_logo.png'}
              alt="logo-stripe"
              height={40}
            />
            <Stack
              className="fe fe-external-link p-2 number-font"
              style={{fontSize: 20}}
            />
          </Stack>
          <Stack className="p-2">
            Receive tips via Debit or Credit card, Apple Pay, and Google Pay.
            Link a Stripe account
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};
export default PaymentAccounts;
