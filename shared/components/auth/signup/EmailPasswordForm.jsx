// React
import {useState} from 'react';
// React Bootstrap
import {Stack, Row, Button, Alert} from 'react-bootstrap';
// Mui
import {CircularProgress, Typography} from '@mui/material';
// Redux
import {useSelector} from 'react-redux';
import {getInvitedUser} from '@/shared/redux/slices/user';
// Components
import {FormGroupInput} from '../../bootstrap/FormGroupInput';

export const EmailPasswordForm = ({
  register,
  errors,
  isUsernameVerified,
  isSubmitSuccessful,
  isSubmitting,
}) => {
  const invitedUser = useSelector(getInvitedUser);
  const [isEmailDisabled, setIsEmailDisabled] = useState(invitedUser);

  return (
    <Stack>
      <Row style={{border: '1px solid #eee'}}></Row>
      <FormGroupInput
        label={'Email'}
        labelColor={'#fff'}
        name={'email'}
        type={'email'}
        register={register}
        error={errors?.email?.message}
        placeholder={'Enter Your Email'}
        required
        id={'signup-email-field'}
        disabled={invitedUser && isEmailDisabled}
      />
      <Stack>
        <Typography
          textAlign={'right'}
          onClick={() => {
            (async () => {
              setIsEmailDisabled(false);
            })().then(() => {
              document.querySelector('#signup-email-field').focus();
            });
          }}
          fontSize={'12px'}
          color={'#fff'}
          style={{cursor: 'pointer', display: invitedUser ? 'block' : 'none'}}
        >
          <u>Chnage Email</u>
        </Typography>
      </Stack>
      <FormGroupInput
        label={'Password'}
        labelColor={'#fff'}
        name={'password'}
        type={'password'}
        register={register}
        error={errors?.password?.message}
        placeholder={'Enter Your Password'}
        required
      />
      {!errors?.password?.message && (
        <Typography color={'#FFFFCC'} fontSize={12} px={0.5} mt={-1.5}>
          Password has to have at least 1 small character, 1 capital character,
          a number and a special character
        </Typography>
      )}
      <FormGroupInput
        label={'Confirm Password'}
        labelColor={'#fff'}
        name={'confirmPassword'}
        type={'password'}
        register={register}
        error={errors?.confirmPassword?.message}
        placeholder={'Enter Your Password Again'}
        required
      />
      <Stack className="container-login100-form-btn">
        <Button
          variant={'secondary'}
          type="submit"
          className="login100-form-btn"
          disabled={!isUsernameVerified || isSubmitting || isSubmitSuccessful}
          style={{
            cursor: `${
              !isUsernameVerified || isSubmitting || isSubmitSuccessful
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
    </Stack>
  );
};
