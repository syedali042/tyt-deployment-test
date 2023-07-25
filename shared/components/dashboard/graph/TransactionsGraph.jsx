'use client';
// React Bootstrap
import {Card, Col, Row} from 'react-bootstrap';
// React Chart
import {Line} from 'react-chartjs-2';
// Chart Js
import {Chart, registerables} from 'chart.js';
// Components
import TransactionsGraphActions from './TransactionsGraphActions';
// Chart Settings
import {
  graphOptions as options,
  labels,
  data as graphData,
} from './graphOptions';

Chart.register(...registerables);

const TransactionsGraph = () => {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Transactions',
        data: graphData,
        borderColor: '#6c5ffc',
        backgroundColor: 'rgba(108, 95, 252, 0.6)',
        tension: 0.3,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  return (
    <Row>
      <Col md={12}>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Card.Title as="h3" className="mb-0">
              Transactions Graph
            </Card.Title>
            <TransactionsGraphActions />
          </Card.Header>
          <Card.Body className="pt-4">
            <Line
              className="chart-dropshadow h-330"
              options={options}
              data={data}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TransactionsGraph;
