'use client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/user';

const Authenticationlayout = ({children}) => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <SSRProvider>{currentUser === null && <div>{children}</div>}</SSRProvider>
  );
};

export default Authenticationlayout;
