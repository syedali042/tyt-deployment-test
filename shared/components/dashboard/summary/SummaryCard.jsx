// React Bootstrap
import {Stack, Card} from 'react-bootstrap';

const SummaryCard = ({label, chart, key}) => {
  return (
    <Stack className="card overflow-hidden">
      <Card.Body>
        <Stack className="d-flex">
          <Stack className="mt-2">
            <h6 className="summary-card-label">{label}</h6>
            {/* key will replace actual value from redux */}
            <h3 className="mb-0 number-font summary-card-count pt-1">{'10'}</h3>
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
