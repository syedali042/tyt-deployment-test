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
    if (!currentUser?.id) setUserInState();
  }, []);

  useEffect(() => {
    if (currentUser?.id && !isDashboardPage) router.push('/dashboard/home');
    else if (!currentUser?.id && isDashboardPage) router.push('/auth/login');
  }, [currentUser]);

  return <SSRProvider>{!currentUser?.id && children}</SSRProvider>;
};

export default Authenticationlayout;
