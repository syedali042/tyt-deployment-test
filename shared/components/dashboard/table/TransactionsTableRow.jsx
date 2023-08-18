// Constants
import {TRANSACTION_STATUS, TRANSACTION_TYPES} from '@/shared/constants';
import {createRefund} from '@/shared/redux/slices/transaction';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {useDispatch, useSelector} from 'react-redux';
const TransactionsTableRow = ({index, item, onClick}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  return (
    <tr key={index} onClick={onClick}>
      <td
        className="inbox-small-cells"
        title={TRANSACTION_STATUS[item?.status].label}
        style={{width: '50px'}}
      >
        <i
          className={`fa fa-circle text-${
            TRANSACTION_STATUS[item?.status].color
          }`}
        ></i>
      </td>
      <td
        className="inbox-small-cells"
        title={TRANSACTION_TYPES[item?.type.toLowerCase()].label}
        style={{width: '150px'}}
      >
        {TRANSACTION_TYPES[item?.type.toLowerCase()].icon}
      </td>
      <td
        className=" dont-show text-dark fw-semibold clickable-row"
        style={{width: '150px'}}
      >
        ${item?.amount}
      </td>
      <td className="text-dark clickable-row">{item?.notes}</td>
      <td
        style={{display: currentUser?.role == 'user' ? 'none' : 'block'}}
        className="text-dark clickable-row text-end"
      >
        {item.isRefundable && (
          <button
            style={{padding: '0rem 0.51rem'}}
            className="btn btn-primary btn-sm"
            onClick={async () => {
              await dispatch(createRefund({transactionId: item.objId}));
            }}
          >
            Refund
          </button>
        )}
      </td>
      <td className="text-dark clickable-row text-end">
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
