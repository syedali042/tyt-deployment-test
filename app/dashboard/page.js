'use client';
import React from 'react';
import {Stack} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser, signOutUser} from '@/shared/redux/slices/user';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import {useRouter} from 'next/navigation';
// For Later Use
// import PageHeader from '../../shared/layout-components/pageheader/pageHeader';
// import Contentlayout from '@/shared/layout-components/layout/content-layout';

const Dashboard = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    // For Later Use
    // <Contentlayout>
    // <PageHeader titles="Dashboard" active="Dashboard" items={['Home']} />
    // </Contentlayout>

    /////Temp
    <Authenticationlayout>
      <Stack className={'login-img'}>
        <Stack
          className="position-absolute p-5"
          style={{right: 10, zIndex: 1000, cursor: 'pointer'}}
        >
          <Stack
            className="d-flex align-items-center font-weight-bold text-white"
            style={{fontSize: '1.5rem'}}
            onClick={() => {
              dispatch(signOutUser());
              router.push('/auth/login');
            }}
          >
            <i
              className="fa fa-sign-out"
              style={{transform: 'translateY(10%)'}}
            ></i>
            &nbsp;
            <a className="pull-right" style={{textDecoration: 'underline'}}>
              Logout
            </a>
          </Stack>
        </Stack>
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
    </Authenticationlayout>
  );
};

export default Dashboard;
