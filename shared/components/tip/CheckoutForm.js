import React from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {Button, Col, Row, Alert, Stack} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {
  getIsPaymentRequestLoading,
  getPaymentIntentId,
  getTipNotes,
  updateCheckoutProcess,
} from '@/shared/redux/slices/tip';
import {useState, useEffect} from 'react';
import {CircularProgress} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import TipMessage from './TipMessage';

export default function CheckoutForm() {
  const isLoading = useSelector(getIsPaymentRequestLoading);
  const [error, setError] = useState(null);
  const [tipperEmail, setTipperEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const paymentIntentId = useSelector(getPaymentIntentId);
  const notes = useSelector(getTipNotes);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setError('Payment succeeded!');
          break;
        case 'processing':
          setError('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setError('Your payment was not successful, please try again.');
          break;
        default:
          setError('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateCheckoutProcess({
        paymentIntentId,
        data: {metadata: {email: tipperEmail, notes}},
      })
    );

    if (!stripe || !elements) {
      return;
    }

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setError(error.message);
    } else {
      setError('An unexpected error occurred.');
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };
  return (
    <>
      <TipMessage
        message={error}
        onClick={() => setError(null)}
        icon={<CancelIcon />}
      />
      <form onSubmit={handleSubmit} id="payment-form" className="">
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setTipperEmail(e.value.email)}
          className="w-100 text-white pb-3"
        />
        <PaymentElement
          className="w-100 text-white "
          id="payment-element"
          options={paymentElementOptions}
        />
        <Row className="pt-3">
          <Col md={{span: 12}}>
            <Button
              variant="secondary"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
              }}
              type="submit"
            >
              {isLoading ? <CircularProgress /> : 'Pay Now'}
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}
