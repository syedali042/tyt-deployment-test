'use client';
import React, {useEffect, useState} from 'react';
import Footer from '../footer/footer';
import Rightside from '../rightside/rightside';
import BacktoTop from '../backtotop/backtotop';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {usePathname, useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentUser,
  setUserInStateFromLocalStorage,
} from '@/shared/redux/slices/user';

const Contentlayout = ({children}) => {
  const pathname = usePathname();
  const router = useRouter();
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

  useEffect(() => {
    document
      .querySelector('body')
      .classList.add('app', 'sidebar-mini', 'ltr', 'light-mode');
    document
      .querySelector('body')
      .classList.remove('login-img', 'landing-page', 'horizontal');

    if (
      localStorage.getItem('sashhorizontal') ||
      localStorage.getItem('sashhorizontalHover')
    ) {
      document.body.classList.remove('sidebar-mini');
      document.body.classList.add('horizontal');
    }
  }, []);

  const remove = () => {
    document.querySelector('.sidebar-right').classList.remove('sidebar-open');
    document.querySelector('body').classList.remove('main-sidebar-show');
    document.querySelectorAll('.slide-menu').forEach((res) => {
      if (
        res.classList.contains('open') &&
        document.body.classList.contains('horizontal')
      ) {
        res.classList.remove('open');
        res.classList.add('d-none');
      }
    });
    if (document.querySelector('.card.search-result') != null) {
      document.querySelector('.card.search-result').classList.add('d-none');
    }
  };
  return (
    <>
      {/* <Script src="//code.tidio.co/ejjaylsnuydywf5a0sqc1gvcus5orpml.js" /> */}
      {currentUser?.userInternalId && (
        <SSRProvider>
          <div className="horizontalMenucontainer">
            <div className="page">
              <div className="page-main">
                <Header />
                <div className="sticky" style={{paddingTop: '-74px'}}>
                  <Sidebar />
                </div>
                <div
                  className="jumps-prevent"
                  style={{paddingTop: '74px'}}
                ></div>
                <div
                  className="main-content app-content mt-0"
                  onClick={() => remove()}
                >
                  <div className="side-app">
                    <div className="main-container container-fluid">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
            <Rightside />
            <BacktoTop />
          </div>
        </SSRProvider>
      )}
    </>
  );
};

export default Contentlayout;
