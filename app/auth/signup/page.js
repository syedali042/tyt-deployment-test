'use client';
import {
  Form,
  Button,
  Stack,
  Row,
  Container,
  Col,
  Image,
  InputGroup,
} from 'react-bootstrap';
import {useRouter} from 'next/navigation';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import FormFieldError from '@/shared/components/FormFieldError';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkUsernameAvailability,
  getCurrentUser,
  createUser,
  isLoading as getIsUserRequestLoading,
} from '@/shared/redux/slices/user';
import {auth as firebaseAuth} from '@/shared/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {CircularProgress} from '@mui/material';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import AppModal from '@/shared/components/AppModal';

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isRequestLoading = useSelector(getIsUserRequestLoading);

  const [isUsernameAndPassword, setIsUserNamePassword] = useState(false);
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [showPassword, setShowPassword] = useState(false);

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().min(3).max(40).required('Username is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .min(6)
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
    formState: {errors, isSubmitting, isSubmitSuccessful},
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentUser?.username !== values?.username) {
      setIsUsernameVerified(false);
    } else {
      if (values.username.length >= 3) {
        setIsUsernameVerified(true);
      }
    }
  }, [values]);

  useEffect(() => {
    if (isUsernameVerified) {
      setError('username', null);
    }
  }, [isUsernameVerified]);

  const onSubmit = async (data) => {
    const {username, email, password} = data;
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (user) => {
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
      setError('username', {message: error.message || error});
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
        const additionalInfo = getAdditionalUserInfo(result);
        const {isNewUser} = additionalInfo;

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

        if (isNewUser) {
          await dispatch(createUser(createUserObj));
          router.push('/dashboard');
        } else {
          handleOpenModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

                <FormProvider
                  methods={methods}
                  className="login100-form validate-form"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                            onKeyDown={(e) => {
                              if (e.key == 'Enter') {
                                verifyUsernameAvailability();
                                e.preventDefault();
                              }
                            }}
                          />
                          &nbsp;
                          <Button
                            style={{
                              width: '30%',
                              cursor: `${
                                isUsernameVerified ? 'not-allowed' : 'pointer'
                              }`,
                            }}
                            className="btn btn-sm"
                            disabled={isUsernameVerified}
                            onClick={() => verifyUsernameAvailability()}
                          >
                            <span
                              style={{
                                display: isRequestLoading ? 'none' : 'inline',
                              }}
                            >
                              Verify
                            </span>
                            <Stack
                              style={{
                                transform: 'translateY(15%)',
                                display: isRequestLoading ? 'inline' : 'none',
                              }}
                            >
                              <CircularProgress size={'15px'} color="inherit" />
                            </Stack>
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
                          className={`social-login text-center ${
                            isUsernameAndPassword ? 'bg-dark text-white' : ''
                          }`}
                          onClick={() => {
                            if (!isUsernameVerified) {
                              if (values.username.length >= 3) {
                                setError('username', {
                                  message:
                                    'Please verify if username is available',
                                });
                              } else {
                                setError('username', {
                                  message:
                                    'Username must be atleast 3 characters',
                                });
                              }
                            } else {
                              setIsUserNamePassword(!isUsernameAndPassword);
                            }
                          }}
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
                          onClick={() => {
                            if (!isUsernameVerified) {
                              setError('username', {
                                message: 'Please choose a username first',
                              });
                            } else {
                              signUpWithGoogle();
                            }
                          }}
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
                          <InputGroup>
                            <Form.Control
                              className="form-control"
                              placeholder="Enter your password"
                              name="password"
                              {...register('password')}
                              type={!showPassword ? 'password' : 'text'}
                              required
                            />
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="input-icon"
                              style={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                zIndex: 9999,
                                cursor: 'pointer',
                              }}
                            >
                              <i
                                class={`fa ${
                                  showPassword ? 'fa-eye' : 'fa-eye-slash'
                                }`}
                              />
                            </div>
                          </InputGroup>

                          <FormFieldError error={errors?.password?.message} />
                        </Form.Group>
                        <Form.Group
                          className="text-start form-group"
                          controlId="formpassword"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <InputGroup>
                            <Form.Control
                              className="form-control"
                              placeholder="Enter your password again"
                              name="confirmPassword"
                              {...register('confirmPassword')}
                              type={!showPassword ? 'password' : 'text'}
                              required
                            />
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="input-icon"
                              style={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                zIndex: 9999,
                                cursor: 'pointer',
                              }}
                            >
                              <i
                                class={`fa ${
                                  showPassword ? 'fa-eye' : 'fa-eye-slash'
                                }`}
                              />
                            </div>
                          </InputGroup>
                          <FormFieldError
                            error={errors?.confirmPassword?.message}
                          />
                        </Form.Group>
                        <Stack className="container-login100-form-btn">
                          <Button
                            type="submit"
                            className="login100-form-btn btn-primary"
                            disabled={
                              !isUsernameVerified ||
                              isSubmitting ||
                              isSubmitSuccessful
                            }
                            style={{
                              cursor: `${
                                !isUsernameVerified ||
                                isSubmitting ||
                                isSubmitSuccessful
                                  ? 'not-allowed'
                                  : 'pointer'
                              }`,
                            }}
                          >
                            {isSubmitSuccessful ? (
                              <>Please wait, I&apos;m preparing dashboard</>
                            ) : (
                              <>
                                <span
                                  style={{
                                    display: isSubmitting ? 'none' : 'inline',
                                  }}
                                >
                                  Sign Up
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
                  </form>
                </FormProvider>
              </Row>
            </Stack>
            {/* // <!-- CONTAINER CLOSED --> */}
            <AppModal
              handleOpen={handleOpenModal}
              handleClose={handleCloseModal}
              open={openModal}
              title={'Already a member'}
              description={
                'You are already registered with this email, click below to be redirected to the login page.'
              }
              path={'/auth/login'}
            />
          </Stack>
        </Stack>
      </Authenticationlayout>
    </>
  );
}
