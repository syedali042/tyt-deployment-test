// React
import {useEffect, useState} from 'react';
// React Bootstrap
import {Stack, Row, Button, Col} from 'react-bootstrap';
// Mui
import {CircularProgress, Typography} from '@mui/material';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  checkEmailAvailability,
  triggerSendingInvitationLinkEmail,
  getInvitedUser,
  isLoading as getIsUserRequestLoading,
} from '@/shared/redux/slices/user';
// Components
import {FormGroupInput} from '../../bootstrap/FormGroupInput';
import {useRouter} from 'next/navigation';

export const EmailPasswordForm = ({
  register,
  errors,
  isUsernameVerified,
  isSubmitSuccessful,
  isSubmitting,
  values,
  setError,
}) => {
  const router = useRouter();
  const isRequestLoading = useSelector(getIsUserRequestLoading);

  const dispatch = useDispatch();
  const invitedUser = useSelector(getInvitedUser);

  const [isEmailDisabled, setIsEmailDisabled] = useState(invitedUser);

  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  const [isInvitationLinkSent, setInvitationLinkSent] = useState(false);

  useEffect(() => {
    if (invitedUser) setIsEmailDisabled(true);
  }, [invitedUser]);

  const verifyEmail = async () => {
    setIsEmailAvailable(false);
    setError('email', {message: ''});
    try {
      const {email} = values;
      await dispatch(checkEmailAvailability({email}));
      setIsEmailAvailable(true);
    } catch (error) {
      const {message} = error;
      if (error?.cause?.unverifiedUser) setIsEmailAvailable(null);
      else {
        setError('email', {message});
      }
    }
  };

  const getInvitationLink = async () => {
    try {
      const {email} = values;
      if (email.length > 3) {
        await dispatch(triggerSendingInvitationLinkEmail({email}));
        setInvitationLinkSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      {/* <Row className="mb-4" style={{border: '1px solid #eee'}}></Row> */}
      <Row
        style={{
          alignItems: 'center',
          paddingLeft: '12px',
          paddingRight: '12px',
        }}
      >
        <Col md={{span: 9}} className="p-0">
          <FormGroupInput
            name={'email'}
            type={'email'}
            register={register}
            error={errors?.email?.message}
            placeholder={'Enter Your Email'}
            required
            id={'signup-email-field'}
            disabled={!isUsernameVerified || (invitedUser && isEmailDisabled)}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                verifyEmail();
                e.preventDefault();
              }
            }}
          />
        </Col>
        <Col md={3}>
          <button
            style={{
              width: '100%',
              transform: 'translateY(-30%)',
            }}
            className="btn btn-sm btn-secondary"
            onClick={(e) => {
              verifyEmail();
              e.preventDefault();
            }}
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
          </button>
        </Col>
      </Row>
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
      {isEmailAvailable == null && (
        <div style={{padding: '0px 12px 0px 0px'}}>
          <div
            style={{
              color: '#ac0700 !important',
              background: '#fff',
              borderRadius: '5px',
              padding: '10px',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            <p>Someone already invited you, click the button below</p>
            <button
              style={{
                cursor: `${isInvitationLinkSent ? 'not-allowed' : 'pointer'}`,
              }}
              disabled={isInvitationLinkSent}
              onClick={(e) => {
                e.preventDefault();
                getInvitationLink();
              }}
              className="btn btn-primary btn-sm w-100"
            >
              {(() => {
                if (isRequestLoading) return <CircularProgress size={'13px'} />;
                else if (isInvitationLinkSent)
                  return 'Invitation link sent to your email';
                else return 'Get Invitation Link Email';
              })()}
            </button>
          </div>
          <div
            onClick={(e) => {
              router.push('/auth/login');
              e.preventDefault();
            }}
            style={{
              textAlign: 'right',
              color: '#fff',
              paddingTop: '10px',
              cursor: 'pointer',
            }}
          >
            <u>Go to Login</u>
          </div>
        </div>
      )}
      {invitedUser || isEmailAvailable ? (
        <>
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
            <Typography
              sx={{color: '#fff !important'}}
              fontSize={12}
              px={0.5}
              mt={-1.5}
            >
              Password has to have at least 1 small character, 1 capital
              character, a number and a special character
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
              disabled={
                !isUsernameVerified || isSubmitting || isSubmitSuccessful
              }
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
        </>
      ) : (
        ''
      )}
    </Stack>
  );
};
