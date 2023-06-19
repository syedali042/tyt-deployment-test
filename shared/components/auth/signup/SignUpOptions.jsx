import {Stack} from 'react-bootstrap';
import {SignUpWithGoogle} from './SignUpWithGoogle';

export const SignUpOptions = ({
  setError,
  setIsUserNamePassword,
  isUsernameAndPassword,
  values,
  isUsernameVerified,
}) => {
  return (
    <Stack className="d-flex justify-content-between">
      <Stack
        style={{
          width: '100%',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
        className={`social-login text-center ${
          isUsernameAndPassword ? 'bg-dark text-white' : ''
        }`}
        onClick={() => {
          if (!isUsernameVerified) {
            if (values.username.length >= 3) {
              setError('username', {
                message: 'Please verify if username is available',
              });
            } else {
              setError('username', {
                message: 'Username must be atleast 3 characters',
              });
            }
          } else {
            setIsUserNamePassword(!isUsernameAndPassword);
          }
        }}
      >
        Email/Password
      </Stack>
      <SignUpWithGoogle
        isUsernameVerified={isUsernameVerified}
        setError={setError}
        username={values?.username}
      />
    </Stack>
  );
};
