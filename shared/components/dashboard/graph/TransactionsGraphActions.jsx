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
    if (action === 'previous') {
      const startDateObj = new Date(startDate);
      const previousTransactions = transactions?.filter(
        ({date}) => new Date(date) < startDateObj
      );
      const newStartDate = previousTransactions[0].date;
      const newEndDate =
        previousTransactions[previousTransactions.length - 1].date;
      const difference = getMonthDifference(newStartDate, newEndDate);
      if (difference <= 12) {
        dispatch(setStartDate({date: newStartDate}));
        dispatch(setEndDate({date: newEndDate}));
      } else {
        let startDateForMoreThanTwelveMonthsDifference = new Date(newEndDate);
        startDateForMoreThanTwelveMonthsDifference.setFullYear(
          new Date(newEndDate).getFullYear() - 1
        );
        startDateForMoreThanTwelveMonthsDifference.setDate(1);
        startDateForMoreThanTwelveMonthsDifference.setMonth(
          new Date(newEndDate).getMonth() + 1
        );
        dispatch(
          setStartDate({date: startDateForMoreThanTwelveMonthsDifference})
        );
        dispatch(setEndDate({date: newEndDate}));
      }
    } else {
      const endDateObj = new Date(endDate);
      const nextTransactions = transactions?.filter(
        ({date}) => new Date(date) > endDateObj
      );
      const newStartDate = nextTransactions[0].date;
      const newEndDate = nextTransactions[nextTransactions.length - 1].date;
      const difference = getMonthDifference(newStartDate, newEndDate);
      if (difference <= 12) {
        dispatch(setStartDate({date: newStartDate}));
        dispatch(setEndDate({date: newEndDate}));
      } else {
        let endDateForMoreThanTwelveMonthsDifference = new Date(newStartDate);
        endDateForMoreThanTwelveMonthsDifference.setFullYear(
          new Date(newStartDate).getFullYear() + 1
        );
        endDateForMoreThanTwelveMonthsDifference.setDate(1);
        endDateForMoreThanTwelveMonthsDifference.setMonth(
          new Date(newStartDate).getMonth() - 1
        );
        dispatch(setStartDate({date: newStartDate}));
        dispatch(setEndDate({date: endDateForMoreThanTwelveMonthsDifference}));
      }
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
          new Date(startDate) <=
          new Date(transactions?.[transactions?.length - 1]?.date)
        }
      >
        Next <ArrowForwardIcon />
      </button>
    </Stack>
  );
};
export default TransactionsGraphActions;
