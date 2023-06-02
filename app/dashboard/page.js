'use client';
import React from 'react';
import {Stack} from 'react-bootstrap';
// For Later Use
// import PageHeader from '../../shared/layout-components/pageheader/pageHeader';
// import Contentlayout from '@/shared/layout-components/layout/content-layout';

const Dashboard = () => {
  return (
    // For Later Use
    // <Contentlayout>
    // <PageHeader titles="Dashboard" active="Dashboard" items={['Home']} />
    // </Contentlayout>
    <Stack className={'login-img'}>
      <Stack className={'page'}>
        <Stack
          className={'bg-white p-5 mx-auto w-50'}
          style={{borderRadius: '10px'}}
        >
          <h3>
            Hi{' '}
            <b>
              <u>Syed,</u>
            </b>
          </h3>
          <h3 className={'text-justify'}>
            We can’t wait to launch our services and we show you all the great
            things we’ve working on. We will inform you soon when we go live.
          </h3>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
