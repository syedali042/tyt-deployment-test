'use client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/user';

const Authenticationlayout = ({children}) => {
  const currentUser = useSelector(getCurrentUser);
  return !currentUser?.userInternalId && <SSRProvider>{children}</SSRProvider>;
};

export default Authenticationlayout;
