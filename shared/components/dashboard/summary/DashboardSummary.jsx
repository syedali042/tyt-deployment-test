'use client';
// React Bootstrap
import {Row, Col} from 'react-bootstrap';
// Components
import SummaryCard from './SummaryCard';
// Constants
import {DASHBOARD_WIDGETS_ARR} from '@/shared/constants';
import './summary.css';

const DashboardSummary = () => {
  return (
    <Row>
      {DASHBOARD_WIDGETS_ARR.map((widget) => {
        const label = widget[0];
        const chart = widget[1];
        const key = widget[2];
        return (
          <Col lg={3} md={3} sm={12} xxl={3}>
            <SummaryCard label={label} chart={chart} summaryKey={key} />
          </Col>
        );
      })}
    </Row>
  );
};

export default DashboardSummary;
