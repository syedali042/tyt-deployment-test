import {checkUsernameAvailability} from '@/shared/redux/slices/user';
import {useDispatch} from 'react-redux';
import {Stack, Form, Button} from 'react-bootstrap';
import FormFieldError from '../../FormFieldError';
import {CircularProgress} from '@mui/material';

export const UsernameVerifier = ({
  register,
  isUsernameVerified,
  error,
  isRequestLoading,
  setError,
  setIsUsernameVerified,
  value,
}) => {
  const dispatch = useDispatch();

  const verifyUsernameAvailability = async () => {
    try {
      const username = value;
      await dispatch(checkUsernameAvailability({username, type: 'username'}));
      if (currentUser.username) setIsUsernameVerified(true);
      else setError('username', {message: 'Username already taken'});
    } catch (error) {
      setError('username', {message: error.message || error});
    }
  };
  return (
    <Stack>
      <Form.Group className="text-start form-group" controlId="formEmail">
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
              cursor: `${isUsernameVerified ? 'not-allowed' : 'pointer'}`,
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
        <FormFieldError error={error} />
        {isUsernameVerified && (
          <Stack className="text-success px-1" style={{fontSize: '0.8rem'}}>
            Username is available
          </Stack>
        )}
      </Form.Group>
    </Stack>
  );
};
