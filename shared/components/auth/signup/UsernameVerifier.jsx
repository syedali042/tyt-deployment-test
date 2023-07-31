import './UsernameVerifier.css';
import {
  checkUsernameAvailability,
  getIsUsernameVerified,
  getUsernameToRegister,
} from '@/shared/redux/slices/user';
import {useSelector, useDispatch} from 'react-redux';
import {Stack, Form, Button, Row, Col} from 'react-bootstrap';
import FormFieldError from '../../FormFieldError';
import {CircularProgress} from '@mui/material';
import {useEffect} from 'react';

export const UsernameVerifier = ({
  register,
  error,
  isRequestLoading,
  setError,
  value,
}) => {
  const dispatch = useDispatch();
  const usernameToRegister = useSelector(getUsernameToRegister);
  const isUsernameVerified = useSelector(getIsUsernameVerified);

  useEffect(() => {
    if (!isUsernameVerified)
      setError('username', {message: 'user already registered'});
  }, [usernameToRegister]);

  const verifyUsernameAvailability = async () => {
    try {
      const username = value;
      await dispatch(checkUsernameAvailability({username}));
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
              className="get-started-tip-text page-signup-get-started-tip-text font-weight-bold"
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
              className="get-started-default-input page-signup-get-started-tip-text"
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
        {isUsernameVerified && usernameToRegister.length >= 3 && (
          <Stack className="text-success px-1" style={{fontSize: '0.8rem'}}>
            Username is available
          </Stack>
        )}
      </Form.Group>
    </Stack>
  );
};
