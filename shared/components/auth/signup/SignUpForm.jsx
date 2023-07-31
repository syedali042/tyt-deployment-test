'use client';
// React
import {useEffect, useState} from 'react';
// Next
import {useRouter} from 'next/navigation';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  createUser,
  isLoading as getIsUserRequestLoading,
  getInvitedUser,
  updateUser,
  getUsernameToRegister,
  setIsUsernameVerified,
  getIsUsernameVerified,
} from '@/shared/redux/slices/user';
// React Bootstrap
import {Row} from 'react-bootstrap';
// React Hook Form
import {FormProvider, useForm} from 'react-hook-form';
// Yup
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
// Firebase
import {auth as firebaseAuth} from '@/shared/firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
// Icons
// import {CircularProgress} from '@mui/material';
// Components
import {UsernameVerifier} from './UsernameVerifier';
// import {SignUpOptions} from './SignUpOptions';
import {EmailPasswordForm} from './EmailPasswordForm';

export const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const usernameToRegister = useSelector(getUsernameToRegister);
  const isUsernameVerified = useSelector(getIsUsernameVerified);
  const invitedUser = useSelector(getInvitedUser);
  const isRequestLoading = useSelector(getIsUserRequestLoading);

  // const [isUsernameAndPassword, setIsUserNamePassword] = useState(false);

  // const [showPassword, setShowPassword] = useState(false);

  const SignUpSchema = Yup.object().shape({
    username: Yup.string().min(3).max(40).required('Username is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .min(6)
      .required('Enter your password')
      .matches(
        /[a-z]+/,
        'Password has to have at least 1 small character, 1 capital character, a number and a special character'
      )
      .matches(
        /[A-Z]+/,
        'Password has to have at least 1 small character, 1 capital character, a number and a special character'
      )
      .matches(
        /[@$!%*#?&]+/,
        'Password has to have at least 1 small character, 1 capital character, a number and a special character'
      )
      .matches(
        /\d+/,
        'Password has to have at least 1 small character, 1 capital character, a number and a special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required('Enter your password again'),
  });

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      username: usernameToRegister,
      email: invitedUser?.email || '',
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
    if (usernameToRegister !== values?.username) {
      dispatch(setIsUsernameVerified(false));
    } else {
      dispatch(setIsUsernameVerified(true));
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
        const {displayName, photoURL, uid, email, accessToken} = user.user;
        const username = values?.username;
        const userObj = {
          firebaseId: uid,
          email,
          username,
          photoURL,
          displayName,
          accessToken,
          loginType: 'email',
        };

        if (!invitedUser) await dispatch(createUser(userObj));
        else {
          userObj.userInternalId = invitedUser?.userInternalId;
          userObj.verified = true;
          await dispatch(updateUser({userDataToUpdate: userObj}));
        }
      })
      .catch((error) => {
        console.log(error);
        setError('email', {message: 'Email Already Taken'});
      });
  };

  return (
    <FormProvider methods={methods} className="login100-form validate-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-white mt-5"> Sign Up</h1>
        <Row
          className="mx-auto mb-5"
          style={{width: '10%', borderBottom: '1px solid #fff'}}
        ></Row>
        <UsernameVerifier
          register={register}
          error={errors?.username?.message}
          setError={setError}
          isRequestLoading={isRequestLoading}
          value={values?.username}
        />

        {/* {!isUsernameAndPassword && (
          <SignUpOptions
            setError={setError}
            setIsUserNamePassword={setIsUserNamePassword}
            isUsernameAndPassword={isUsernameAndPassword}
            values={values}
            isUsernameVerified={isUsernameVerified}
          />
        )} */}
        {/* {isUsernameAndPassword && ( */}
        {/* <> */}
        <EmailPasswordForm
          register={register}
          errors={errors}
          isUsernameVerified={isUsernameVerified}
          isSubmitSuccessful={isSubmitSuccessful}
          isSubmitting={isSubmitting}
        />
        {/* <Row className="text-center pt-3"></Row>
        <center>
          <a
            href="#"
            className="cursor-pointer"
            onClick={() => setIsUserNamePassword(false)}
          >
            <u>Change Method</u>
          </a>
        </center> */}
        {/* </> */}
        {/* )} */}
      </form>
    </FormProvider>
  );
};
