import {Stack, Row, Button} from 'react-bootstrap';
import {CircularProgress} from '@mui/material';
import {FormGroupInput} from '../../bootstrap/FormGroupInput';
export const EmailPasswordForm = ({
  register,
  errors,
  isUsernameVerified,
  isSubmitSuccessful,
  isSubmitting,
}) => {
  return (
    <Stack>
      <Row style={{border: '1px solid #eee'}}></Row>
      <FormGroupInput
        label={'Email'}
        name={'email'}
        type={'email'}
        register={register}
        error={errors?.email?.message}
        placeholder={'Enter Your Email'}
        required
      />
      <FormGroupInput
        label={'Password'}
        name={'password'}
        type={'password'}
        register={register}
        error={errors?.password?.message}
        placeholder={'Enter Your Password'}
        required
      />
      <FormGroupInput
        label={'Confirm Password'}
        name={'confirmPassword'}
        type={'password'}
        register={register}
        error={errors?.confirmPassword?.message}
        placeholder={'Enter Your Password Again'}
        required
      />
      <Stack className="container-login100-form-btn">
        <Button
          type="submit"
          className="login100-form-btn btn-primary"
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
