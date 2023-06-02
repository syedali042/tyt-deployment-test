'use client';
import {Form, Button, Stack, Row, Container, Col, Image} from 'react-bootstrap';
import {useRouter} from 'next/navigation';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import FormFieldError from '@/shared/components/FormFieldError';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkUsernameAvailability,
  getCurrentUser,
  createUser,
} from '@/shared/redux/slices/user';
import {auth as firebaseAuth} from '@/shared/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [isUsernameAndPassword, setIsUserNamePassword] = useState(false);
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const SignUpSchema = Yup.object().shape({
    username: Yup.string().min(6).max(40).required('Username is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('Enter your password')
      .matches(
        /[a-z]+/,
        'Password should have lowercases, uppercases, numbers & symbols'
      )
      .matches(
        /[A-Z]+/,
        'Password should have lowercases, uppercases, numbers & symbols'
      )
      .matches(
        /[@$!%*#?&]+/,
        'Password should have lowercases, uppercases, numbers & symbols'
      )
      .matches(
        /\d+/,
        'Password should have lowercases, uppercases, numbers & symbols'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required('Enter your password again'),
  });

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      username: currentUser?.username,
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: {errors},
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentUser?.username !== values?.username) {
      setIsUsernameVerified(false);
    } else {
      setIsUsernameVerified(true);
      // setError('username', null); // Ali: this causing error
    }
  }, [values]);

  const onSubmit = async (data) => {
    const {username, email, password} = data;
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (user) => {
        console.log(user);
        const {displayName, photoURL, uid, email} = user.user;
        const username = values?.username;
        const createUserObj = {
          firebaseId: uid,
          email,
          username,
          photoURL,
          displayName,
          loginType: 'email',
        };

        await dispatch(createUser(createUserObj));
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setError('email', {message: 'Email Already Taken'});
      });
  };

  const verifyUsernameAvailability = async () => {
    try {
      const {username} = values;
      await dispatch(checkUsernameAvailability({username, type: 'username'}));
      if (currentUser.username) setIsUsernameVerified(true);
      else setError('username', {message: 'Username already taken'});
    } catch (error) {
      setError('username', {message: 'Username already taken'});
    }
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    signInWithPopup(firebaseAuth, provider)
      .then(async (result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        const {displayName, photoURL, uid, email} = user;
        const username = values?.username;
        const createUserObj = {
          firebaseId: uid,
          email,
          username,
          photoURL,
          displayName,
          loginType: 'google',
        };
        await dispatch(createUser(createUserObj));
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
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
                  alt="logo-dark"
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
                <Stack>
                  <Form.Group
                    className="text-start form-group"
                    controlId="formEmail"
                  >
                    <Stack className={`d-flex align-items-center`}>
                      <p
                        style={{
                          transform: 'translateY(35%)',
                          fontWeight: 'bold',
                        }}
                      >
                        tipyourteacher.co/
                      </p>
                      &nbsp;
                      <Form.Control
                        className="form-control"
                        placeholder="Enter your username"
                        name="username"
                        {...register('username')}
                        type="text"
                        required
                      />
                      &nbsp;
                      <Button
                        style={{
                          width: '30%',
                          cursor: ``,
                        }}
                        className="btn btn-sm"
                        disabled={isUsernameVerified}
                        onClick={() => verifyUsernameAvailability()}
                      >
                        Verify
                      </Button>
                    </Stack>
                    <FormFieldError error={errors?.username?.message} />
                    {isUsernameVerified && (
                      <Stack
                        className="text-success px-1"
                        style={{fontSize: '0.8rem'}}
                      >
                        Username is available
                      </Stack>
                    )}
                  </Form.Group>
                </Stack>
                {!isUsernameAndPassword && (
                  <Stack className="d-flex justify-content-between">
                    <Stack
                      style={{
                        width: '45%',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                      }}
                      className={`social-login text-center `}
                      onClick={() =>
                        setIsUserNamePassword(!isUsernameAndPassword)
                      }
                    >
                      Email/Password
                    </Stack>
                    <Stack
                      style={{
                        width: '45%',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                      }}
                      className="social-login text-center"
                      onClick={() => signUpWithGoogle()}
                    >
                      <Image
                        style={{
                          transform: 'translateY(-8%)',
                        }}
                        src="/assets/images/brand/google.svg"
                      />
                    </Stack>
                  </Stack>
                )}
                {isUsernameAndPassword && (
                  <Stack>
                    <Row style={{border: '1px solid #eee'}}></Row>
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
                        disabled={!isUsernameVerified}
                        style={{
                          cursor: ``,
                        }}
                      >
                        Sign Up
                      </Button>
                    </Stack>
                    <Row className="text-center pt-3"></Row>
                    <center>
                      <a
                        href="#"
                        className="cursor-pointer"
                        onClick={() => setIsUserNamePassword(false)}
                      >
                        <u>Change Method</u>
                      </a>
                    </center>
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
