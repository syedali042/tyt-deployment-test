'use client';
import {Form, Button, Stack, Row, Container, Col, Image} from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import FormFieldError from '@/shared/components/FormFieldError';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';

export default function SignUp() {
  const params = useSearchParams();
  const [isUsernameAndPassword, setIsUserNamePassword] = useState(false);
  const SignUpSchema = Yup.object().shape({
    username: Yup.string().min(6).max(40).required('Username is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required('Enter your password again'),
  });

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      username: params?.get('username') || '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <>
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

              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                className="login100-form validate-form"
              >
                <h1 className="text-center mt-5"> Sign Up</h1>
                <Row
                  className="mx-auto mb-5"
                  style={{width: '4vh', borderBottom: '1px solid #555'}}
                ></Row>
                <Stack className="d-flex justify-content-center">
                  <Stack
                    style={{
                      width: '20vh',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    className="social-login mx-1 me-4 text-center"
                    onClick={() =>
                      setIsUserNamePassword(!isUsernameAndPassword)
                    }
                  >
                    Username/Password
                  </Stack>
                  <Stack
                    style={{
                      width: '20vh',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    className="social-login mx-1 me-4 text-center"
                  >
                    Google
                  </Stack>
                </Stack>
                {isUsernameAndPassword && (
                  <Stack>
                    <Form.Group
                      className="text-start form-group"
                      controlId="formEmail"
                    >
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        className="form-control"
                        placeholder="Enter your username"
                        name="username"
                        {...register('username')}
                        type="text"
                        required
                        disabled={params.get('username')}
                      />
                      <FormFieldError error={errors?.username?.message} />
                    </Form.Group>
                    <Form.Group
                      className="text-start form-group"
                      controlId="formEmail"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        className="form-control"
                        placeholder="Enter your email"
                        name="email"
                        {...register('email')}
                        type="text"
                        required
                      />
                      <FormFieldError error={errors?.email?.message} />
                    </Form.Group>
                    <Form.Group
                      className="text-start form-group"
                      controlId="formpassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        {...register('password')}
                        type="password"
                        required
                      />
                      <FormFieldError error={errors?.password?.message} />
                    </Form.Group>
                    <Form.Group
                      className="text-start form-group"
                      controlId="formpassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        className="form-control"
                        placeholder="Enter your password again"
                        name="confirmPassword"
                        {...register('confirmPassword')}
                        type="password"
                        required
                      />
                      <FormFieldError
                        error={errors?.confirmPassword?.message}
                      />
                    </Form.Group>
                    <Stack className="container-login100-form-btn">
                      <Button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        className="login100-form-btn btn-primary"
                      >
                        Sign Up
                      </Button>
                    </Stack>
                    <Row className="text-center pt-3"></Row>
                  </Stack>
                )}
              </FormProvider>
            </Row>
          </Stack>
          {/* // <!-- CONTAINER CLOSED --> */}
        </Stack>
      </Stack>
    </>
  );
}
