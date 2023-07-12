'use client';
import React from 'react';
import {Col, Row, Stack} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser, signOutUser} from '@/shared/redux/slices/user';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import {useRouter} from 'next/navigation';

const Welcome = () => {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Authenticationlayout>
      <Stack className={'login-img'}>
        <Stack
          className="position-absolute p-5"
          style={{right: 10, zIndex: 1000, cursor: 'pointer'}}
        >
          <Stack
            className="d-flex align-items-center font-weight-bold text-white"
            style={{fontSize: '1.5rem'}}
            onClick={async () => {
              await dispatch(signOutUser());
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
          <Row style={{margin: 0}}>
            <Col md={3} sm={2} xs={1}></Col>
            <Col md={6} sm={8} xs={10}>
              <Stack
                className={'bg-white p-5 mx-auto'}
                style={{borderRadius: '10px'}}
              >
                <h3
                  style={{
                    fontWeight: 600,
                  }}
                  className="text-primary"
                >
                  Success!
                </h3>
                <h4>
                  You are now a part of Tip Your Teacher! <br />
                  <br />
                  We look forward to helping those you serve show their
                  appreciation for all you do in the noblest of professions.{' '}
                  <br />
                  <br />
                  We have added you to our list to be a part of our intitial
                  launch. Look for an email from us with additional information
                  on your next steps!
                </h4>
              </Stack>
            </Col>
            <Col md={3} sm={2} xs={1}></Col>
          </Row>
        </Stack>
      </Stack>
    </Authenticationlayout>
  );
};

export default Welcome;
