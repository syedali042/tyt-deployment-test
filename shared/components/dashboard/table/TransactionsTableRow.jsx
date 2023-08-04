// Constants
import {TRANSACTION_STATUS, TRANSACTION_TYPES} from '@/shared/constants';

const TransactionsTableRow = ({index, item}) => {
  return (
    <tr key={index}>
      <td className="inbox-small-cells">
        <i
          className={`fa fa-circle text-${
            TRANSACTION_STATUS[item.status].color
          }`}
        ></i>
      </td>
      <td className="inbox-small-cells">
        {TRANSACTION_TYPES[item.type.toLowerCase()].icon}
      </td>
      <td className="view-message dont-show text-dark fw-semibold clickable-row">
        ${item.amount}
      </td>
      <td className="view-message  text-dark clickable-row">
        {item.notes || 'No Notes Available'}
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
