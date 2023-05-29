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
        <PageHeader
          titles="Dashboard 01"
          active="Dashboard 01"
          items={['Home']}
        />
        {/* <!-- ROW-1 --> */}
        <Row>
          <Col lg={12} md={12} sm={12} xl={12}>
            <Row>
              <Col lg={6} md={6} sm={12} xxl={3}>
                <Card className="overflow-hidden">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="mt-2">
                        <h6 className="">Total Users</h6>
                        <h2 className="mb-0 number-font">44,278</h2>
                      </div>
                      <div className="ms-auto">
                        <div className="chart-wrapper mt-1">
                          <TotalUser />
                        </div>
                      </div>
                    </div>
                    <span className="text-muted fs-12">
                      <span className="text-secondary mx-2">
                        <i className="fe fe-arrow-up-circle  text-secondary"></i>{' '}
                        5%
                      </span>
                      Last week
                    </span>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} md={6} sm={12} xxl={3}>
                <div className="card overflow-hidden">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="mt-2">
                        <h6 className="">Total Profit</h6>
                        <h2 className="mb-0 number-font">67,987</h2>
                      </div>
                      <div className="ms-auto">
                        <div className="chart-wrapper mt-1">
                          <TotalProfit />
                        </div>
                      </div>
                    </div>
                    <span className="text-muted fs-12">
                      <span className="text-pink mx-2">
                        <i className="fe fe-arrow-down-circle text-pink"></i>{' '}
                        0.75%
                      </span>
                      Last 6 days
                    </span>
                  </Card.Body>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xxl={3}>
                <div className="card overflow-hidden">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="mt-2">
                        <h6 className="">Total Expenses</h6>
                        <h2 className="mb-0 number-font">$76,965</h2>
                      </div>
                      <div className="ms-auto">
                        <div className="chart-wrapper mt-1">
                          <TotalExpenses />
                        </div>
                      </div>
                    </div>
                    <span className="text-muted fs-12">
                      <span className="text-green mx-2">
                        <i className="fe fe-arrow-up-circle text-green"></i>{' '}
                        0.9%
                      </span>
                      Last 9 days
                    </span>
                  </Card.Body>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12} xxl={3}>
                <Card className="overflow-hidden">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="mt-2">
                        <h6 className="">Total Cost</h6>
                        <h2 className="mb-0 number-font">$59,765</h2>
                      </div>
                      <div className="ms-auto">
                        <div className="chart-wrapper mt-1">
                          <TotalCost />
                        </div>
                      </div>
                    </div>
                    <span className="text-muted fs-12">
                      <span className="text-warning mx-2">
                        <i className="fe fe-arrow-up-circle text-warning"></i>{' '}
                        0.6%
                      </span>
                      Last year
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <!-- ROW-1 END --> */}
        {/* <!-- ROW-2 --> */}
        <Row>
          <Col sm={12} md={12} lg={12} xl={8} xxl={9}>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Sales Analytics</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="chartjs-wrapper-demo myChartSaah">
                  <SalesAnalytics />
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* <!-- COL END --> */}
          <Col md={12} sm={12} lg={12} xl={4} xxl={3}>
            <Card className="overflow-hidden">
              <Card.Body className="pb-0 bg-recentorder">
                <Card.Title as="h3" className="text-white">
                  Recent Orders
                </Card.Title>
                <div className="chartjs-wrapper-demo">
                  <RecentOrder />
                </div>
              </Card.Body>
              <div id="flotback-chart" className="flot-background"></div>
              <Card.Body>
                <div className="d-flex mb-4 mt-3">
                  <div className="avatar avatar-md bg-secondary-transparent text-secondary bradius me-3">
                    <i className="fe fe-check"></i>
                  </div>
                  <div className="">
                    <h6 className="mb-1 fw-semibold">Delivered Orders</h6>
                    <p className="fw-normal fs-12">
                      {' '}
                      <span className="text-success mx-1">3.5%</span>
                      increased{' '}
                    </p>
                  </div>
                  <div className=" ms-auto my-auto">
                    <p className="fw-bold fs-20"> 1,768 </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="avatar  avatar-md bg-pink-transparent text-pink bradius me-3">
                    <i className="fe fe-x"></i>
                  </div>
                  <div className="">
                    <h6 className="mb-1 fw-semibold">Cancelled Orders</h6>
                    <p className="fw-normal fs-12">
                      {' '}
                      <span className="text-success mx-1">1.2%</span>
                      increased{' '}
                    </p>
                  </div>
                  <div className=" ms-auto my-auto">
                    <p className="fw-bold fs-20 mb-0"> 3,675 </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* <!-- COL END --> */}
        </Row>
        {/* <!-- ROW-2 END --> */}
      </div>
    </div>
  );
};

DashboardCom.layout = 'Contentlayout';
export default DashboardCom;
