'use client';
import {Stack, Row, Col, Image} from 'react-bootstrap';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import {SignUpForm} from '@/shared/components/auth/signup/SignUpForm';
export default function SignUp() {
  return (
    <>
      <Authenticationlayout>
        <Stack className="login-img">
          <Stack className="page">
            {/* <!-- CONTAINER OPEN --> */}
            <Row className="col-login mx-auto mt-7"></Row>
            <Stack className="container-login100">
              <Row className="wrap-login100 p-6">
                <Col className="text-center">
                  <Image
                    src={'/assets/images/brand/logo-dark.png'}
                    className="header-brand-img"
                    alt="logo-dark"
                    style={{width: '30vh'}}
                  />
                </Col>
                <SignUpForm />
              </Row>
            </Stack>
            {/* // <!-- CONTAINER CLOSED --> */}
          </Stack>
        </Stack>
      </Authenticationlayout>
    </>
  );
}
