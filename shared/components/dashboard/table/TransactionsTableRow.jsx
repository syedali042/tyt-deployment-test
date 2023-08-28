// Constants
import {TRANSACTION_STATUS, TRANSACTION_TYPES} from '@/shared/constants';
import {createRefund} from '@/shared/redux/slices/transaction';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
const TransactionsTableRow = ({index, item, onClick}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  return (
    <tr key={index}>
      <td
        title={TRANSACTION_STATUS[item?.status].label}
        style={{width: '100px'}}
      >
        <i
          className={`fa fa-circle text-${
            TRANSACTION_STATUS[item?.status].color
          }`}
        ></i>
      </td>
      <td
        width={'150px'}
        title={TRANSACTION_TYPES[item?.type.toLowerCase()].label}
      >
        {TRANSACTION_TYPES[item?.type.toLowerCase()].icon}
      </td>
      <td width={'150px'}>${item?.amount}</td>
      <td onClick={onClick}>
        <Typography
          width={500}
          fontSize={14}
          fontWeight={400}
          padding={0}
          noWrap
          color={'#282f53'}
        >
          {item?.notes}
        </Typography>
      </td>
      <td
        width={'150px'}
        style={{display: currentUser?.role == 'user' ? 'none' : 'block'}}
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
      <td className="text-end">
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
