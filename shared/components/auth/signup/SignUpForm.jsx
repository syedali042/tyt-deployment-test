'use client';
import {Row} from 'react-bootstrap';
import {useRouter} from 'next/navigation';
import {FormProvider, useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentUser,
  createUser,
  isLoading as getIsUserRequestLoading,
} from '@/shared/redux/slices/user';
import {auth as firebaseAuth} from '@/shared/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {CircularProgress} from '@mui/material';
import {UsernameVerifier} from './UsernameVerifier';
import {SignUpOptions} from './SignUpOptions';
import {EmailPasswordForm} from './EmailPasswordForm';
export const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isRequestLoading = useSelector(getIsUserRequestLoading);

  const [isUsernameAndPassword, setIsUserNamePassword] = useState(false);
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);

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
        setError('email', {message: 'Email Already Taken'});
      });
  };

  return (
    <FormProvider methods={methods} className="login100-form validate-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center mt-5"> Sign Up</h1>
        <Row
          className="mx-auto mb-5"
          style={{width: '4vh', borderBottom: '1px solid #555'}}
        ></Row>
        <UsernameVerifier
          register={register}
          isUsernameVerified={isUsernameVerified}
          setIsUsernameVerified={setIsUsernameVerified}
          error={errors?.username?.message}
          setError={setError}
          isRequestLoading={isRequestLoading}
          value={values?.username}
        />

        {!isUsernameAndPassword && (
          <SignUpOptions
            setError={setError}
            setIsUserNamePassword={setIsUserNamePassword}
            isUsernameAndPassword={isUsernameAndPassword}
            values={values}
            isUsernameVerified={isUsernameVerified}
          />
        )}
        {isUsernameAndPassword && (
          <>
            <EmailPasswordForm
              register={register}
              errors={errors}
              isUsernameVerified={isUsernameVerified}
              isSubmitSuccessful={isSubmitSuccessful}
              isSubmitting={isSubmitting}
            />
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
          </>
        )}
      </form>
    </FormProvider>
  );
};
