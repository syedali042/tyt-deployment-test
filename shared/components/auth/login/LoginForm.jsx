'use client';
import Link from 'next/link';
import {Button, Stack, Row} from 'react-bootstrap';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {signInUser} from '@/shared/redux/slices/user';
import {useEffect} from 'react';
import {auth as firebaseAuth} from '@/shared/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {CircularProgress} from '@mui/material';
import {FormGroupInput} from '@/shared/components/bootstrap/FormGroupInput';
import {SignUpSignInWithGoogle} from '../social/SignUpSignInWithGoogle';
export const LoginForm = () => {
  const router = useRouter();
  const [showEmailPasswordForm, setShowEmailPasswordForm] = useState(false);
  const dispatch = useDispatch();
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
    const {usernameOrEmail, password} = data;
    await signInWithEmailAndPassword(firebaseAuth, usernameOrEmail, password)
      .then(async (user) => {
        await dispatch(signInUser(user.user));
        router.push('/dashboard');
      })
      .catch((error) => {
        const errorString = error.toString();
        if (errorString.includes('wrong-password')) {
          setError('usernameOrEmail', {message: 'Credentials Not Matched'});
          setError('password', {message: 'Credentials Not Matched'});
        } else if (errorString.includes('user-not-found')) {
          setError('usernameOrEmail', {message: 'No user found'});
        } else {
          setError('usernameOrEmail', {message: errorString});
        }
      });
  };

  useEffect(() => {
    setShowEmailPasswordForm(false);
  }, [values.usernameOrEmail]);

  return (
    <FormProvider methods={methods} className="login100-form validate-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center mt-5"> Login</h1>
        <Row
          className="mx-auto mb-5"
          style={{width: '4vh', borderBottom: '1px solid #555'}}
        ></Row>
        <Stack>
          <FormGroupInput
            name={'usernameOrEmail'}
            register={register}
            label={'Email'}
            type={'email'}
            placeholder={'Enter Your Email'}
            error={errors?.usernameOrEmail?.message}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                setShowEmailPasswordForm(true);
                e.preventDefault();
              }
            }}
            required
          />
          {showEmailPasswordForm && (
            <FormGroupInput
              name={'password'}
              register={register}
              label={'Password'}
              type={'password'}
              placeholder={'Enter Your Password'}
              error={errors?.password?.message}
            />
          )}
          <Stack className="container-login100-form-btn">
            {showEmailPasswordForm ? (
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
                onClick={() => setShowEmailPasswordForm(true)}
                className="login100-form-btn btn-primary"
              >
                Next
              </Button>
            )}
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
          <SignUpSignInWithGoogle type={'sign-in'} />
        </Stack>
      </form>
    </FormProvider>
  );
};
