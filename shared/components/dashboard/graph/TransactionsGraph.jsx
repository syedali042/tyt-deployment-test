'use client';
// React Bootstrap
import {Card, Col, Row} from 'react-bootstrap';
// React Chart
import {Line} from 'react-chartjs-2';
// Chart Js
import {Chart, registerables} from 'chart.js';
// Redux
import {useSelector} from 'react-redux';
import {
  getEndDate,
  getStartDate,
  getTransactions,
} from '@/shared/redux/slices/transaction';
// Components
import TransactionsGraphActions from './TransactionsGraphActions';
// Chart Settings
import {graphOptions as options} from './graphOptions';
// Utils
import {
  generateMonthYearLabelsArray,
  sumAmountsByMonth,
} from '@/shared/utils/transaction';

Chart.register(...registerables);

const TransactionsGraph = () => {
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const labels = generateMonthYearLabelsArray({startDate, endDate});
  const transactions = useSelector(
    getTransactions({filterByStartDate: true, filterByEndDate: true})
  );
  const transactionsSumByMonth = sumAmountsByMonth(
    transactions?.length > 0 ? transactions : []
  );

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Transactions',
        data: transactionsSumByMonth,
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
