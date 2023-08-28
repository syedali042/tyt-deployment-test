'use client';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUsers,
  getCurrentUser,
  setUserInStateFromLocalStorage,
} from '@/shared/redux/slices/user';
import {initializeTransactions} from '@/shared/redux/slices/transaction';
import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';
import {CircularProgress} from '@mui/material';

const AuthGaurd = ({children}) => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isDashboardPage = pathname.includes('/dashboard');
  const isAuthPage = pathname.includes('/auth');
  const [layoutDecided, setLayoutDecided] = useState(false);
  useEffect(() => {
    // Set User In State If Exists in Local Storage
    const setUserInState = async () => {
      await dispatch(setUserInStateFromLocalStorage());
    };
    if (!currentUser?.userInternalId) setUserInState();

    // Redirect to login or home w.r.t user
    if (currentUser?.userInternalId && isAuthPage)
      router.push('/dashboard/home');
    else if (!currentUser?.userInternalId && isDashboardPage)
      router.push('/auth/login');

    // Initalizate Dashboard Preparation
    const initializeDashboardPreparation = async () => {
      if (currentUser?.role == 'admin') await dispatch(fetchUsers());
      await dispatch(initializeTransactions());
    };
    if (currentUser?.userInternalId) initializeDashboardPreparation();
    setLayoutDecided(true);
  }, [currentUser?.userInternalId]);

  return layoutDecided ? (
    children
  ) : (
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
      <CircularProgress size={'50px'} style={{color: '#fff'}} />
    </div>
  );
};

export default AuthGaurd;
