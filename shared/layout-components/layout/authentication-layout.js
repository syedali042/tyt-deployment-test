'use client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {useState} from 'react';
import {useEffect} from 'react';

const Authenticationlayout = ({children}) => {
  const currentUser = useSelector(getCurrentUser);
  const [display, setDisplay] = useState('none');
  useEffect(() => {
    if (currentUser == null) setDisplay('block');
  }, [currentUser]);
  return (
    !currentUser && (
      <SSRProvider>
        <div style={{display}}>{children}</div>
      </SSRProvider>
    )
  );
};

export default Authenticationlayout;
