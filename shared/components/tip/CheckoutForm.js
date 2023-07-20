// React
import {useState} from 'react';
// Stripe
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
// React Bootstrap
import {Button, Col, Row} from 'react-bootstrap';
// MUI
import {CircularProgress} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getIsPaymentRequestLoading,
  setTipperEmail,
  initializeOrUpdateTipProcess,
  getErrors,
} from '@/shared/redux/slices/tip';
// Components
import TipMessage from './TipMessage';

export default function CheckoutForm() {
  const [error, setError] = useState(null);
  const isLoading = useSelector(getIsPaymentRequestLoading);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const tipErrors = useSelector(getErrors);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      initializeOrUpdateTipProcess({
        action: 'updateAmountTipperEmailAndNotes',
      })
    );

    if (tipErrors !== null) {
      setError(tipErrors.message);
      return;
    }
    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
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
          onChange={(e) => dispatch(setTipperEmail(e.value.email))}
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
