'use client';
import {Stack, Row, Col, Image} from 'react-bootstrap';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import {LoginForm} from '@/shared/components/auth/login/LoginForm';
export default function Login() {
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
                    alt=""
                    style={{width: '30vh'}}
                  />
                </Col>
                <LoginForm />
              </Row>
            </Stack>
            {/* // <!-- CONTAINER CLOSED --> */}
          </Stack>
        </Stack>
      </Authenticationlayout>
    </>
  );
}
