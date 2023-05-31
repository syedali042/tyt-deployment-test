'use client';
import React from 'react';
import PageHeader from '../../shared/layout-components/pageheader/pageHeader';
import Contentlayout from '@/shared/layout-components/layout/content-layout';

const Dashboard = () => {
  return <Contentlayout children={DashboardCom} />;
};
const DashboardCom = () => {
  return (
    <div>
      <PageHeader titles="Dashboard" active="Dashboard" items={['Home']} />
    </div>
  );
};

export default Dashboard;
