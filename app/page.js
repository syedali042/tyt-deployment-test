'use client';
import './page.css';
import {useRouter} from 'next/navigation';
import {Stack, Row, Container, Image, Button, Col, Form} from 'react-bootstrap';
import {useForm, FormProvider} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import FormFieldError from '@/shared/components/FormFieldError';
import {
  checkUsernameAvailability,
  getUsernameToRegister,
} from '@/shared/redux/slices/user';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress} from '@mui/material';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import {useEffect} from 'react';

export default function GetStarted() {
  let router = useRouter();
  const dispatch = useDispatch();
  const usernameToRegister = useSelector(getUsernameToRegister);
  const GetStartedSchema = Yup.object().shape({
    username: Yup.string().min(3).max(40).required('User Name is required'),
  });

  const methods = useForm({
    resolver: yupResolver(GetStartedSchema),
    defaultValues: {
      username: '',
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = methods;

  useEffect(() => {
    if (usernameToRegister != null) {
      if (usernameToRegister) router.push('/auth/signup');
      else setError('username', {message: 'Username already taken'});
    }
  }, [usernameToRegister]);

  const onSubmit = async (data) => {
    try {
      const {username} = data;
      await dispatch(checkUsernameAvailability({username, type: 'username'}));
    } catch (error) {
      setError('username', {message: error.message || error});
    }
  };

  return (
    <>
      <Authenticationlayout>
        <Stack className="login-img">
          <Stack
            className="position-absolute p-5"
            style={{right: 10, zIndex: 1000, cursor: 'pointer'}}
          >
            <Stack
              className="d-flex align-items-center font-weight-bold text-white"
              style={{fontSize: '1.5rem'}}
              onClick={() => router.push('/auth/login')}
            >
              <i
                className="fa fa-sign-in"
                style={{transform: 'translateY(10%)'}}
              ></i>
              &nbsp;
              <a className="pull-right" style={{textDecoration: 'underline'}}>
                Login
              </a>
            </Stack>
          </Stack>
          <Stack className="page">
            {/* <!-- CONTAINER OPEN --> */}
            <Row className="col-login mx-auto mt-7"></Row>
            <Container className="container">
              <Stack className="wrap bg-light-blue p-6">
                <Stack className="d-flex justify-content-center">
                  <Image
                    src={'/assets/images/brand/logo-white.png'}
                    style={{width: '200px'}}
                  />
                </Stack>
                <FormProvider
                  methods={methods}
                  className="login100-form validate-form"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="d-none d-md-block text-white text-center mt-5">
                      {' '}
                      Set Up Account & Start Getting Your Tips
                    </h1>
                    <h3 className="d-md-none text-white text-center mt-5">
                      {' '}
                      Set Up Account & Start Getting Your Tips
                    </h3>
                    <Row
                      className="mx-auto mb-5"
                      style={{width: '10%', borderBottom: '1px solid #fff'}}
                    ></Row>
                    <Row
                      className="mx-auto border gx-0 d-flex align-items-center justify-content-between"
                      style={{
                        background: '#fff',
                        maxWidth: '630px',
                        borderRadius: '10px',
                      }}
                    >
                      <Col className="d-flex" xs={12} md={9}>
                        <Stack>
                          <h3
                            className="get-started-tip-text font-weight-bold"
                            style={{
                              transform: 'translateY(25%)',
                              fontWeight: 500,
                            }}
                          >
                            tipyourteacher.co/t/
                          </h3>
                        </Stack>
                        <Stack>
                          <input
                            name={'username'}
                            {...register('username')}
                            placeholder="yourname"
                            className="get-started-default-input"
                          />
                        </Stack>
                      </Col>
                      <Col className="d-none d-md-block" md={3}>
                        <SubmitButton
                          isSubmitSuccessful={isSubmitSuccessful}
                          isSubmitting={isSubmitting}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="d-md-none mt-2">
                        <SubmitButton
                          isSubmitSuccessful={isSubmitSuccessful}
                          isSubmitting={isSubmitting}
                        />
                      </Col>
                    </Row>
                    <Stack>
                      <center>
                        <FormFieldError error={errors?.username?.message} />
                      </center>
                    </Stack>
                  </form>
                </FormProvider>
              </Stack>
            </Container>
            {/* // <!-- CONTAINER CLOSED --> */}
          </Stack>
        </Stack>
      </Authenticationlayout>
    </>
  );
}

const SubmitButton = ({isSubmitting, isSubmitSuccessful}) => {
  return (
    <Button
      variant="secondary"
      disabled={isSubmitting || isSubmitSuccessful}
      type="submit"
      className="w-100 p-2 d-flex justify-content-center"
    >
      {isSubmitSuccessful ? (
        <>Please wait...</>
      ) : (
        <>
          <span
            style={{
              display: isSubmitting ? 'none' : 'inline',
            }}
          >
            Get started
          </span>
          <CircularProgress
            style={{
              display: isSubmitting ? 'inline' : 'none',
            }}
            size={25}
            color="inherit"
          />
        </>
      )}
    </Button>
  );
};
