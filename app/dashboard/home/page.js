'use client';
import React from 'react';
// For Later Use
import PageHeader from '@/shared/layout-components/pageheader/pageHeader';
import Contentlayout from '@/shared/layout-components/layout/content-layout';
import DashboardSummary from '@/shared/components/dashboard/summary/DashboardSummary';

const DashboardHome = () => {
  return (
    <Contentlayout>
      <PageHeader titles="" active="Home" items={['Dashboard']} />
      <DashboardSummary />
    </Contentlayout>
  );
};

export default DashboardHome;
