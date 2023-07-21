'use client';
import PageHeader from '@/shared/layout-components/pageheader/pageHeader';
import Contentlayout from '@/shared/layout-components/layout/content-layout';

const Dashboard = () => {
  return (
    <Contentlayout>
      <PageHeader titles="" active="Profile" items={['Home']} />
    </Contentlayout>
  );
};

export default Dashboard;
