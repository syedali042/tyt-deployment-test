'use client';
import React, {useEffect, useState} from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
const Authenticationlayout = ({children}) => {
  const [renderUi, setRenderUi] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const isWelcomeOrDashboardIncludes =
      pathname.includes('/welcome') || pathname.includes('/dashboard');
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage && !isWelcomeOrDashboardIncludes)
      router.push('/welcome');
    else if (!userFromStorage && !isWelcomeOrDashboardIncludes)
      setRenderUi(true);
    else if (userFromStorage && isWelcomeOrDashboardIncludes) setRenderUi(true);
    else if (!userFromStorage && isWelcomeOrDashboardIncludes)
      router.push('/auth/login');
  }, []);
  return (
    <>
      <SSRProvider>{renderUi && children}</SSRProvider>
    </>
  );
};

export default Authenticationlayout;
