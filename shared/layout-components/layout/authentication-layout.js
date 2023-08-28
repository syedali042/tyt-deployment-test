'use client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useSelector} from 'react-redux';
import {
  getCurrentUser,
  getIsCurrentUserInitialValue,
} from '@/shared/redux/slices/user';
import {CircularProgress} from '@mui/material';

const Authenticationlayout = ({children}) => {
  const currentUser = useSelector(getCurrentUser);
  const isCurrentUserInitialValue = useSelector(getIsCurrentUserInitialValue);

  return (
    <SSRProvider>
      {currentUser === null && !isCurrentUserInitialValue ? (
        <div>{children}</div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={'24px'} />
        </div>
      )}
    </SSRProvider>
  );
};

export default Authenticationlayout;
