'use client';
import React from 'react';
import ContentLayout from '@/shared/layout-components/layout/content-layout';
import PageHeader from '@/shared/layout-components/pageheader/pageHeader';
import {Col, Row} from 'react-bootstrap';

// Components
import PaymentAccounts from '@/shared/components/profile/PaymentAccount';
import UserInfo from '@/shared/components/profile/UserInfo';

const Dashboard = () => {
  return (
    <ContentLayout>
      <PageHeader titles="" active="Profile" items={['Dashboard']} />
      <Row>
        <Col lg={8} md={8} sm={12} xxl={9}>
          <UserInfo />
        </Col>
        <Col lg={4} md={4} sm={12} xxl={3}>
          <PaymentAccounts />
        </Col>
      </Row>
    </ContentLayout>
  );
};

export default Dashboard;
