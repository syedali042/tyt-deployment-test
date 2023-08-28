'use client';
// React
import {useEffect} from 'react';
// Next
import {useRouter, useSearchParams} from 'next/navigation';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {getErrors, setInvitedUser} from '@/shared/redux/slices/user';
// React Bootstrap
import {Stack, Row, Col, Image, Alert} from 'react-bootstrap';
// Layout
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
// Components
import {SignUpForm} from '@/shared/components/auth/signup/SignUpForm';

export default function SignUp() {
  const params = useSearchParams();
  const token = params.get('token');
  const dispatch = useDispatch();
  const router = useRouter();
  const errors = useSelector(getErrors);
  useEffect(() => {
    const callSetInvitedUser = async () =>
      await dispatch(setInvitedUser({token}));
    if (token) callSetInvitedUser();
  }, []);

  useEffect(() => {
    if (errors?.code == 403) {
      router.push('/auth/login');
    }
  }, [errors]);
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
                {errors?.code === 403 && (
                  <center>
                    <Alert
                      className="mt-2"
                      variant={'danger'}
                      style={{color: '#fff', textAlign: 'center'}}
                    >
                      You are already verified user, redirecting to login please
                      wait....
                    </Alert>
                  </center>
                )}
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
