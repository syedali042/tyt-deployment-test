import './UsernameVerifier.css';
import {checkUsernameAvailability} from '@/shared/redux/slices/user';
import {useDispatch} from 'react-redux';
import {Stack, Form, Button, Row, Col} from 'react-bootstrap';
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
        <Row
          style={{
            alignItems: 'center',
            padding: '12px',
          }}
        >
          <Col
            md={{span: 9}}
            className="d-flex p-2"
            style={{
              padding: '10px !important',
              background: '#fff',
              borderRadius: '10px',
            }}
          >
            <h3
              className="get-started-tip-text font-weight-bold"
              style={{
                transform: 'translateY(25%)',
                fontWeight: 500,
              }}
            >
              tipyourteacher.co/t/
            </h3>
            <input
              name={'username'}
              placeholder="yourname"
              className="get-started-default-input"
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
          </Col>
          <Col md={3}>
            &nbsp;
            <button
              style={{
                width: '100%',
                cursor: `${isUsernameVerified ? 'not-allowed' : 'pointer'}`,
                transform: 'translateY(-35%)',
              }}
              className="btn btn-sm btn-secondary"
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
            </button>
          </Col>
        </Row>
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
