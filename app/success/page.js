'use client';
// Next
import {useRouter} from 'next/navigation';
// React Bootstrap
import {Button, Col, Image, Row, Stack} from 'react-bootstrap';
// Styles
import './page.css';

export default function SuccessPage() {
  const router = useRouter();
  return (
    <Stack className="mainContainer">
      <Stack>
        <Image
          src="/assets/images/payments/tick-thanks-page.png"
          alt="thanks-tick"
          height={150}
        />
      </Stack>
      <Stack className="pt-5">
        <h1 className="fw-bold">Thank you!</h1>
      </Stack>
      <Stack className="w-50 text-center number-font">
        Thank you so much for your generous tip! Your thoughts and appreciation
        means a lot to me. Glad to have helped you, and glad to know my service
        was helpful to you.
      </Stack>
      <Stack>
        <Row className="text-center">
          <Col className="p-5" md={6} sm={12}>
            <Button
              variant="primary"
              className="thanks-page-button"
              onClick={() => router.push('/tip')}
            >
              Tip another teacher
            </Button>
          </Col>
          <Col className="p-5" md={6} sm={12}>
            <Button
              variant="primary"
              className="thanks-page-button"
              onClick={() => router.push('/')}
            >
              Take me to the home page
            </Button>
          </Col>
        </Row>
      </Stack>
    </Stack>
  );
}
