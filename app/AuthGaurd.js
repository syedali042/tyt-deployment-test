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

const AuthGaurd = ({children}) => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isDashboardPage = pathname.includes('/dashboard');
  useEffect(() => {
    // Set User In State If Exists in Local Storage
    const setUserInState = async () => {
      await dispatch(setUserInStateFromLocalStorage());
    };
    if (!currentUser?.userInternalId) setUserInState();

    // Redirect to login or home w.r.t user
    if (currentUser?.userInternalId && !isDashboardPage)
      router.push('/dashboard/home');
    else if (!currentUser?.userInternalId && isDashboardPage)
      router.push('/auth/login');

    // Initalizate Dashboard Preparation
    const initializeDashboardPreparation = async () => {
      if (currentUser?.role == 'admin') await dispatch(fetchUsers());
      await dispatch(initializeTransactions());
    };
    if (currentUser?.userInternalId) initializeDashboardPreparation();
  }, [currentUser?.userInternalId]);

  return children;
};

export default AuthGaurd;
