'use client';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers, getCurrentUser} from '@/shared/redux/slices/user';
import {initializeTransactions} from '@/shared/redux/slices/transaction';
import {usePathname, useRouter} from 'next/navigation';
import {CircularProgress} from '@mui/material';
import Footer from '@/shared/layout-components/footer/footer';

const LoaderComponent = () => {
  return (
    <div
      style={{
        backgroundColor: 'rgb(45,71,107)',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={'45px'} style={{color: '#fff'}} />
    </div>
  );
};

const AuthGaurd = ({children}) => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isDashboardPage = pathname.includes('/dashboard');
  const isAuthPage = pathname.includes('/auth') || pathname == '/';
  const [layoutDecided, setLayoutDecided] = useState(false);

  useEffect(() => {
    setLayoutDecided(false);

    // Redirect to login or home w.r.t user
    if (currentUser?.userInternalId && isAuthPage)
      router.push('/dashboard/home');
    else if (!currentUser?.userInternalId && isDashboardPage)
      router.push('/auth/login');
    setLayoutDecided(true);
  }, [pathname, currentUser]);

  useEffect(() => {
    // Initalizate Dashboard Preparation
    const initializeDashboardPreparation = async () => {
      if (currentUser?.role == 'admin') await dispatch(fetchUsers());
      await dispatch(initializeTransactions());
    };
    if (currentUser?.userInternalId) initializeDashboardPreparation();
  }, [currentUser?.userInternalId]);

  if (layoutDecided)
    return (
      <>
        {children}
        <div
          style={{
            display: isDashboardPage && 'none',
            position: 'fixed',
            bottom: 0,
            background: '#4c6281',
            width: '100%',
            padding: '15px 0px',
            zIndex: 999,
          }}
        >
          <div className="container text-white">
            <Footer linkColor={'#FFFFCC'} />
          </div>
        </div>
      </>
    );
  else return <LoaderComponent />;
};

export default AuthGaurd;
