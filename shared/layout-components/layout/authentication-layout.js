'use client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useSelector} from 'react-redux';
import {
  getCurrentUser,
  getIsCurrentUserInitialValue,
} from '@/shared/redux/slices/user';

const Authenticationlayout = ({children}) => {
  const currentUser = useSelector(getCurrentUser);
  const isCurrentUserInitialValue = useSelector(getIsCurrentUserInitialValue);

  return (
    <SSRProvider>
      {currentUser === null && !isCurrentUserInitialValue && (
        <div>{children}</div>
      )}
    </SSRProvider>
  );
};

export default Authenticationlayout;
