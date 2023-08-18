// React Bootstrap
import {Stack} from 'react-bootstrap';
// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useDispatch, useSelector} from 'react-redux';
import {
  getEndDate,
  getStartDate,
  getTransactions,
  setEndDate,
  setStartDate,
} from '@/shared/redux/slices/transaction';
import {getMonthDifference} from '@/shared/utils/transaction';

const TransactionsGraphActions = () => {
  const startDate = useSelector(getStartDate);
  const endDate = useSelector(getEndDate);
  const transactions = useSelector(getTransactions({}));
  const dispatch = useDispatch();

  const handleGraphAction = async (action) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (action == 'previous') {
      let newStartDate = new Date(startDateObj);
      newStartDate.setFullYear(newStartDate.getFullYear() - 1);

      let newEndDate = new Date(endDateObj);
      newEndDate.setFullYear(newEndDate.getFullYear() - 1);
      dispatch(setStartDate({date: newStartDate}));
      dispatch(setEndDate({date: newEndDate}));
    }

    if (action == 'next') {
      let newStartDate = new Date(startDateObj);
      newStartDate.setFullYear(newStartDate.getFullYear() + 1);

      let newEndDate = new Date(endDateObj);
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      dispatch(setStartDate({date: newStartDate}));
      dispatch(setEndDate({date: newEndDate}));
    }
  };
  return (
    <Stack className="d-flex align-items-center pull-right">
      <button
        className="d-flex align-items-center btn btn-default btn-sm"
        onClick={() => handleGraphAction('previous')}
        disabled={new Date(startDate) <= new Date(transactions?.[0]?.date)}
      >
        <ArrowBackIcon /> &nbsp;Previous
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        className="d-flex align-items-center btn btn-info btn-sm"
        onClick={() => handleGraphAction('next')}
        disabled={
          new Date(endDate) >=
          new Date(transactions?.[transactions?.length - 1]?.date)
        }
      >
        Next <ArrowForwardIcon />
      </button>
    </Stack>
  );
};
export default TransactionsGraphActions;
