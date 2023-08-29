'use client';
import React, {useEffect} from 'react';
import Footer from '../footer/footer';
import Rightside from '../rightside/rightside';
import BacktoTop from '../backtotop/backtotop';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {
  calculateTransactionsDatesForGraph,
  getIsTransactionsRequestLoading,
  getTransactions,
  prepareTransactionsSummary,
} from '@/shared/redux/slices/transaction';

const Contentlayout = ({children}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const transactionsList = useSelector(getTransactions({}));
  const isTransactionsRequestLoading = useSelector(
    getIsTransactionsRequestLoading
  );

  useEffect(() => {
    const mode = localStorage.getItem('theme-mode');
    document
      .querySelector('body')
      .classList.add('app', 'sidebar-mini', 'ltr', mode || 'light-mode');
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

  useEffect(() => {
    if (!isTransactionsRequestLoading) {
      dispatch(prepareTransactionsSummary());
      dispatch(calculateTransactionsDatesForGraph());
    }
  }, [transactionsList, isTransactionsRequestLoading]);

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
              <footer className="footer mt-3  ">
                <div className="container">
                  <Footer />
                </div>
              </footer>
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
