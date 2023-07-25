'use client';
// React
import {useEffect} from 'react';
// Next
import {useSearchParams} from 'next/navigation';
// Redux
import {useDispatch} from 'react-redux';
import {setInvitedUser} from '@/shared/redux/slices/user';
// React Bootstrap
import {Stack, Row, Col, Image} from 'react-bootstrap';
// Layout
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
// Components
import {SignUpForm} from '@/shared/components/auth/signup/SignUpForm';

export default function SignUp() {
  const params = useSearchParams();
  const token = params.get('token');
  const dispatch = useDispatch();
  const callSetInvitedUser = async () =>
    await dispatch(setInvitedUser({token}));
  useEffect(() => {
    if (token) callSetInvitedUser();
  }, []);
  return (
    <>
      <Authenticationlayout>
        <Stack className="login-img">
          <Stack className="page">
            {/* <!-- CONTAINER OPEN --> */}
            {/* <Row className="col-login mx-auto mt-7"></Row> */}
            <Stack className="container-login100">
              <Row className="wrap-login100 p-6">
                <Col className="text-center">
                  <Image
                    src={'/assets/images/brand/logo-white.png'}
                    className="header-brand-img"
                    alt="logo-dark"
                    style={{width: '50%'}}
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
