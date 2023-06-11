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
    const isDashboardIncludes = pathname.includes('/dashboard');
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage && !isDashboardIncludes) router.push('/dashboard');
    else if (!userFromStorage && !isDashboardIncludes) setRenderUi(true);
    else if (userFromStorage && isDashboardIncludes) setRenderUi(true);
    else if (!userFromStorage && isDashboardIncludes)
      router.push('/auth/login');
  }, []);
  return (
    <>
      <SSRProvider>{renderUi && children}</SSRProvider>
    </>
  );
};

export default Authenticationlayout;
