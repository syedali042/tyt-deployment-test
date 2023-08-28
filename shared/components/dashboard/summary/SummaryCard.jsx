// React Bootstrap
import {getTransactionsSummary} from '@/shared/redux/slices/transaction';
import {CircularProgress} from '@mui/material';
import {Stack, Card} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const SummaryCard = ({label, chart, summaryKey}) => {
  const summary = useSelector(getTransactionsSummary);
  return (
    <Stack className="card overflow-hidden">
      <Card.Body className="p-0">
        <div
          style={{
            paddingTop: '20px',
            paddingRight: '20px',
            paddingBottom: '0px',
            paddingLeft: '20px',
          }}
        >
          <h6 className="summary-card-label">{label}</h6>
          <Stack className="d-flex">
            <Stack className="pt-2">
              <h3 className="mb-0 number-font summary-card-count pt-1">
                {!summary[summaryKey] && summary[summaryKey] !== 0 ? (
                  <CircularProgress size={'25px'} className="pb-1" />
                ) : (
                  summary[summaryKey]
                )}
              </h3>
            </Stack>
            <Stack className="ms-auto">
              <Stack className="chart-wrapper">{chart}</Stack>
            </Stack>
          </Stack>
        </div>
      </Card.Body>
    </Stack>
  );
};
export default SummaryCard;
