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
  getCurrentUser,
} from '@/shared/redux/slices/user';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress} from '@mui/material';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
export default function GetStarted() {
  let router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
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

  const onSubmit = async (data) => {
    try {
      const {username} = data;
      await dispatch(checkUsernameAvailability({username, type: 'username'}));
      if (currentUser.username !== undefined) router.push('/auth/signup');
      else setError('username', {message: 'Username already taken'});
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
              <Stack className="wrap bg-white p-6">
                <Stack className="d-flex justify-content-center">
                  <Image
                    src={'/assets/images/brand/logo-dark.png'}
                    style={{width: '200px'}}
                  />
                </Stack>
                <FormProvider methods={methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center mt-5">
                      {' '}
                      Set Up Account & Start Getting Your Tips
                    </h1>
                    <Row
                      className="mx-auto mb-5"
                      style={{width: '30vh', borderBottom: '1px solid #555'}}
                    ></Row>
                    <Stack className="custom-input">
                      <Row className="get-started-input-row justify-content-center mx-auto">
                        <Col
                          className="default-input-url"
                          style={{transform: 'translateY(12%)'}}
                        >
                          <h1 className="defualt-input-url-text">
                            tipyourteacher.co
                          </h1>
                          <h1 className="defualt-input-url-slash">/</h1>
                        </Col>
                        <Col
                          className="get-started-default-input-container"
                          style={{
                            transform: 'translateY(-5%) translateX(-14%)',
                          }}
                        >
                          <input
                            name={'username'}
                            {...register('username')}
                            placeholder="yourname"
                            className="get-started-default-input"
                          />
                        </Col>
                        <Col className="get-started-default-input-button-container">
                          <Button
                            disabled={isSubmitting || isSubmitSuccessful}
                            type="submit"
                            className="get-started-default-input-button btn-primary"
                            // onClick={handleSubmit(onSubmit)}
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
                                  size={'20px'}
                                  color="inherit"
                                />
                              </>
                            )}
                          </Button>
                        </Col>
                        <br />
                      </Row>
                      <Stack className="field-error-container mx-auto">
                        <FormFieldError error={errors?.username?.message} />
                      </Stack>
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
