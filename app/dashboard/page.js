'use client';
import React from 'react';
// const Dashboard = dynamic(() => import("../../../shared/data/datadashboard/dashbord"), {ssr: false,});
import PageHeader from '../../shared/layout-components/pageheader/pageHeader';

const DashboardCom = () => {
  return (
    <div>
      <div>
        <PageHeader titles="Dashboard" active="Dashboard" items={['Home']} />
      </div>
    </div>
  );
};

DashboardCom.layout = 'Contentlayout';
export default DashboardCom;
