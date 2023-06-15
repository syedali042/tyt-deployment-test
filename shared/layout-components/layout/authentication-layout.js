'use client';
import React, {useEffect, useState} from 'react';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {ThemeProvider, StyledEngineProvider, createTheme} from '@mui/material';

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

  const breakpointValues = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  };

  const theme = createTheme({
    breakpoints: {
      values: breakpointValues,
    },
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <SSRProvider>{renderUi && children}</SSRProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default Authenticationlayout;
