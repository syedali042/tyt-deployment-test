// React Bootstrap
import {Stack} from 'react-bootstrap';
// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TransactionsGraphActions = () => {
  const handleGraphAction = async (action) => {
    if (action === 'previous') {
      alert(action + ' clicked');
    } else {
      alert(action + ' clicked');
    }
  };
  return (
    <Stack className="d-flex align-items-center pull-right">
      <button
        className="d-flex align-items-center btn btn-default btn-sm"
        onClick={() => handleGraphAction('previous')}
      >
        <ArrowBackIcon /> &nbsp;Previous
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        className="d-flex align-items-center btn btn-info btn-sm"
        onClick={() => handleGraphAction('next')}
      >
        Next <ArrowForwardIcon />
      </button>
    </Stack>
  );
};
export default TransactionsGraphActions;
