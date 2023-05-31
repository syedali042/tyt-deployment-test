import Seo from '@/shared/layout-components/seo/seo';
import dynamic from 'next/dynamic';
import React from 'react';
// const Dashboard = dynamic(() => import("../../../shared/data/datadashboard/dashbord"), {ssr: false,});
import Link from 'next/link';
import PageHeader from '../../shared/layout-components/pageheader/pageHeader';
import {Card, Col, Row} from 'react-bootstrap';
import {
  TotalUser,
  TotalProfit,
  TotalExpenses,
  TotalCost,
  SalesAnalytics,
  RecentOrder,
} from '../../shared/data/datadashboard/dashboarddata';

const DashboardCom = () => {
  return (
    <div>
      <Seo title="Dashboard" />

      <div>
        <PageHeader titles="Dashboard" active="Dashboard" items={['Home']} />
      </div>
    </div>
  );
};

DashboardCom.layout = 'Contentlayout';
export default DashboardCom;
