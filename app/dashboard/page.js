'use client';
import React from 'react';
import PageHeader from '../../shared/layout-components/pageheader/pageHeader';
import Contentlayout from '@/shared/layout-components/layout/content-layout';

const DashboardCom = () => {
  return (
    <Contentlayout>
      <PageHeader titles="Dashboard" active="Dashboard" items={['Home']} />
    </Contentlayout>
  );
};

export default DashboardCom;
