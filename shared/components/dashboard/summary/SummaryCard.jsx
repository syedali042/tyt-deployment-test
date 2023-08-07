// React Bootstrap
import {getTransactionsSummary} from '@/shared/redux/slices/transaction';
import {CircularProgress} from '@mui/material';
import {Stack, Card} from 'react-bootstrap';
import {useSelector} from 'react-redux';

const SummaryCard = ({label, chart, summaryKey}) => {
  const summary = useSelector(getTransactionsSummary);
  return (
    <Stack className="card overflow-hidden">
      <Card.Body>
        <Stack className="d-flex">
          <Stack className="mt-2">
            <h6 className="summary-card-label">{label}</h6>
            <h3 className="mb-0 number-font summary-card-count pt-1">
              {!summary[summaryKey] && summary[summaryKey] !== 0 ? (
                <CircularProgress size={'25px'} />
              ) : (
                summary[summaryKey]
              )}
            </h3>
          </Stack>
          <Stack className="ms-auto">
            <Stack className="chart-wrapper">{chart}</Stack>
          </Stack>
        </Stack>
      </Card.Body>
    </Stack>
  );
};
export default SummaryCard;
