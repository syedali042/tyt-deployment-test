// Constants
import {TRANSACTION_STATUS, TRANSACTION_TYPES} from '@/shared/constants';
import {createRefund} from '@/shared/redux/slices/transaction';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {useDispatch, useSelector} from 'react-redux';
const TransactionsTableRow = ({index, item}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  return (
    <tr key={index}>
      <td
        className="inbox-small-cells"
        title={TRANSACTION_STATUS[item.status].label}
      >
        <i
          className={`fa fa-circle text-${
            TRANSACTION_STATUS[item.status].color
          }`}
        ></i>
      </td>
      <td
        className="inbox-small-cells"
        title={TRANSACTION_TYPES[item.type.toLowerCase()].label}
      >
        {TRANSACTION_TYPES[item.type.toLowerCase()].icon}
      </td>
      <td className="view-message dont-show text-dark fw-semibold clickable-row">
        ${item.amount}
      </td>
      <td className="view-message  text-dark clickable-row">
        {item.notes || 'No Notes Available'}
      </td>
      <td
        style={{display: currentUser?.role == 'admin' ? 'none' : 'block'}}
        className="view-message text-dark clickable-row text-end"
      >
        {item.isRefundable && (
          <button
            className="btn btn-primary btn-sm"
            onClick={async () => {
              await dispatch(createRefund({transactionId: item.objId}));
            }}
          >
            Refund
          </button>
        )}
      </td>
      <td
        style={{maxWidth: '150px !important'}}
        className="view-message text-dark clickable-row text-end"
      >
        {new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </td>
    </tr>
  );
};

export default TransactionsTableRow;
