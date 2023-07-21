'use client';
import React from 'react';
// For Later Use
import PageHeader from '@/shared/layout-components/pageheader/pageHeader';
import Contentlayout from '@/shared/layout-components/layout/content-layout';

const Dashboard = () => {
  return (
    <Contentlayout>
      <PageHeader titles="" active="Dashboard" items={['Home']} />
    </Contentlayout>
  );
};

export default Dashboard;
