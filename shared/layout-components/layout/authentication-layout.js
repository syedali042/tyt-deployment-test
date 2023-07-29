'use client';
import React, {useEffect, useState} from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentUser,
  setUserInStateFromLocalStorage,
} from '@/shared/redux/slices/user';

const Authenticationlayout = ({children}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isDashboardPage = pathname.includes('/dashboard');
  useEffect(() => {
    const setUserInState = async () => {
      await dispatch(setUserInStateFromLocalStorage());
    };
    if (!currentUser?.userInternalId) setUserInState();
  }, []);

  useEffect(() => {
    if (currentUser?.userInternalId && !isDashboardPage)
      router.push('/dashboard/home');
    else if (!currentUser?.userInternalId && isDashboardPage)
      router.push('/auth/login');
  }, [currentUser]);

  return !currentUser?.userInternalId && <SSRProvider>{children}</SSRProvider>;
};

export default Authenticationlayout;
