'use client';
import React from 'react';
import {Stack} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/user';
// For Later Use
// import PageHeader from '../../shared/layout-components/pageheader/pageHeader';
// import Contentlayout from '@/shared/layout-components/layout/content-layout';

const Dashboard = () => {
  const currentUser = useSelector(getCurrentUser);
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
          <h3>Hi, </h3>
          <h3 className={'text-justify'}>
            We can&apos;t wait to launch our services and we show you all the
            great things we&apos;ve been working on. You&apos;ll get an email
            from us soon, when we will go live.
          </h3>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
