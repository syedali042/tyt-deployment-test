'use client';
import '@/styles/globals.scss';
import {useEffect} from 'react';
import Header from '@/shared/layout-components/header/header';
import {SSRProvider} from 'react-bootstrap';
import Sidebar from '@/shared/layout-components/sidebar/sidebar';
import Rightside from '@/shared/layout-components/rightside/rightside';
import BacktoTop from '@/shared/layout-components/backtotop/backtotop';
import {Provider} from 'react-redux';
import store from '@/shared/redux/store';
import Footer from '@/shared/layout-components/footer/footer';

export default function RootLayout({children}) {
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
    document.querySelector('.demo_changer').classList.remove('active');
    document.querySelector('.demo_changer').style.right = '-270px';
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
    <html lang="en">
      <title>Tip your teacher - Dashboard</title>
      <link rel="icon" href={'../../../assets/images/brand/favicon.ico'} />
      <body>
        <Provider store={store}>
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
        </Provider>
      </body>
    </html>
  );
}
