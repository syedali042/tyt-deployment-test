'use client';
import React, {useEffect, useState} from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';

const Authenticationlayout = ({children}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardIncludes = pathname.includes('/dashboard');
  let userFromStorage;
  if (typeof window !== 'undefined') {
    userFromStorage = window?.localStorage?.getItem('user');
  }
  const renderUi = !userFromStorage && !isDashboardIncludes;
  useEffect(() => {
    if (userFromStorage && !isDashboardIncludes) router.push('/dashboard/home');
    else if (!userFromStorage && isDashboardIncludes)
      router.push('/auth/login');
  }, []);

  return <SSRProvider>{renderUi && children}</SSRProvider>;
};

export default Authenticationlayout;
