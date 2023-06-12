'use client';
import Link from 'next/link';
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
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import FormFieldError from '@/shared/components/FormFieldError';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkUsernameAvailability,
  getCurrentUser,
  signInUser,
} from '@/shared/redux/slices/user';
import {useEffect} from 'react';
import {auth as firebaseAuth} from '@/shared/firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {CircularProgress} from '@mui/material';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import AppModal from '@/shared/components/AppModal';
export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [emailOrUsernameToVerify, setUsernameOrEmailToVerify] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const LoginSchema = Yup.object().shape({
    usernameOrEmail: Yup.string()
      .min(3)
      .max(40)
      .required('Username Or Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: {errors, isSubmitSuccessful, isSubmitting},
  } = methods;
  const values = watch();

  const onSubmit = async (data) => {
    if (user) {
      const {usernameOrEmail, password} = data;
      await signInWithEmailAndPassword(firebaseAuth, usernameOrEmail, password)
        .then(async (user) => {
          await dispatch(signInUser(user.user));
          router.push('/dashboard');
        })
        .catch((error) => {
          setError('usernameOrEmail', {message: 'Credentials Not Matched'});
          setError('password', {message: 'Credentials Not Matched'});
        });
      setUser(true);
    } else {
      checkIfUserExists();
    }
  };

  const checkIfUserExists = async () => {
    try {
      const {usernameOrEmail} = values;
      setUsernameOrEmailToVerify(usernameOrEmail);
      await dispatch(
        checkUsernameAvailability({email: usernameOrEmail, type: 'email'})
      );
      setUser(true);
    } catch (error) {
      setUser(true);
      setError('usernameOrEmail', null);
    }
  };

  useEffect(() => {
    if (values.usernameOrEmail !== emailOrUsernameToVerify) {
      setUser(false);
    }
  }, [values.usernameOrEmail]);

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    signInWithPopup(firebaseAuth, provider)
      .then(async (result) => {
        const user = result.user;
        const additionalInfo = getAdditionalUserInfo(result);

        const {isNewUser} = additionalInfo;

        if (isNewUser) {
          deleteUser(user).then(() => {
            handleOpenModal();
          });
        } else {
          await dispatch(signInUser(user));
          router.push('/dashboard');
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
                    alt=""
                    style={{width: '30vh'}}
                  />
                </Col>
                <FormProvider
                  methods={methods}
                  className="login100-form validate-form"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-center mt-5"> Login</h1>
                    <Row
                      className="mx-auto mb-5"
                      style={{width: '4vh', borderBottom: '1px solid #555'}}
                    ></Row>
                    <Stack>
                      <Form.Group
                        className="text-start form-group"
                        controlId="formEmail"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          className="form-control"
                          placeholder="Enter your email"
                          name="usernameOrEmail"
                          {...register('usernameOrEmail')}
                          type="text"
                          required
                          onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                              checkIfUserExists();
                              e.preventDefault();
                            }
                          }}
                        />
                        <FormFieldError
                          error={errors?.usernameOrEmail?.message}
                        />
                      </Form.Group>
                      {user && (
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
                      )}
                      <Stack className="container-login100-form-btn">
                        {user ? (
                          <Button
                            disabled={isSubmitting || isSubmitSuccessful}
                            type="submit"
                            className="login100-form-btn btn-primary"
                          >
                            {isSubmitSuccessful ? (
                              <>Please wait, heading to dashboard</>
                            ) : (
                              <>
                                <span
                                  style={{
                                    display: isSubmitting ? 'none' : 'inline',
                                  }}
                                >
                                  Login
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
                        ) : (
                          <Button
                            onClick={() => setUser(true)}
                            className="login100-form-btn btn-primary"
                          >
                            Next
                          </Button>
                        )}
                      </Stack>

                      <Stack className="text-center pt-3">
                        <p className="text-dark mb-0">
                          Not a member?{' '}
                          <span
                            style={{cursor: 'pointer'}}
                            onClick={() => (window.location.href = '/')}
                          >
                            Sign Up
                          </span>
                        </p>
                      </Stack>
                      <Row className="text-center pt-3"></Row>
                      <label className="login-social-icon">
                        <span>Login with Social</span>
                      </label>
                      <Stack className="d-flex justify-content-center">
                        <Stack
                          onClick={() => signUpWithGoogle()}
                          className="social-login me-4 text-center"
                        >
                          <i className="fa fa-google"></i>
                        </Stack>
                      </Stack>
                    </Stack>
                  </form>
                </FormProvider>
              </Row>
            </Stack>
            {/* // <!-- CONTAINER CLOSED --> */}
            <AppModal
              handleOpen={handleOpenModal}
              handleClose={handleCloseModal}
              open={openModal}
              title={'Not a member'}
              description={
                'You are not registered yet with this email, click below to be redirected to the sign up page.'
              }
              path={'/'}
            />
          </Stack>
        </Stack>
      </Authenticationlayout>
    </>
  );
}
