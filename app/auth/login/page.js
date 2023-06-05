'use client';
import Link from 'next/link';
import {Form, Button, Stack, Row, Container, Col, Image} from 'react-bootstrap';
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
} from 'firebase/auth';
import {useRouter} from 'next/navigation';
export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [emailOrUsernameToVerify, setUsernameOrEmailToVerify] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const LoginSchema = Yup.object().shape({
    usernameOrEmail: Yup.string()
      .min(6)
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
    formState: {errors},
  } = methods;
  const values = watch();

  const onSubmit = async (data) => {
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
        await dispatch(signInUser(user));
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
                  alt=""
                  style={{width: '30vh'}}
                />
              </Col>
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(onSubmit)}
                className="login100-form validate-form"
              >
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
                    />
                    <FormFieldError error={errors?.usernameOrEmail?.message} />
                  </Form.Group>
                  {user && (
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
                  )}
                  <Stack className="container-login100-form-btn">
                    <Button
                      onClick={() => {
                        if (user) {
                          onSubmit(values);
                        } else {
                          checkIfUserExists();
                        }
                      }}
                      type="submit"
                      className="login100-form-btn btn-primary"
                    >
                      {user ? 'Login' : 'Next'}
                    </Button>
                  </Stack>

                  <Stack className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Not a member? <Link href={`/auth/signup`}>Sign Up</Link>
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
              </FormProvider>
            </Row>
          </Stack>
          {/* // <!-- CONTAINER CLOSED --> */}
        </Stack>
      </Stack>
    </>
  );
}
