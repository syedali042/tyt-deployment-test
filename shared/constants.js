import AverageTipApexChart from './components/dashboard/widgets-charts/AverageTipApexChart';
import TotalTippersApexChart from './components/dashboard/widgets-charts/TotalTippersApexChart';
import TotalTipsAmountApexChart from './components/dashboard/widgets-charts/TotalTipsAmountApexChart';
import TotalTipsApexChart from './components/dashboard/widgets-charts/TotalTipsApexChart';

export const SEND_TIP_TABS = {
  findTeacherTab: {
    label: 'Find Teacher',
    name: 'find-teacher-tab',
  },
  selectAmountTab: {
    label: 'Select Amount',
    name: 'select-amount-tab',
  },
  checkoutTab: {
    label: 'Checkout',
    name: 'checkout-tab',
  },
};

export const SEND_TIP_TABS_ARR = Object.keys(SEND_TIP_TABS).map((key) => [
  SEND_TIP_TABS[key]['label'],
  SEND_TIP_TABS[key]['name'],
  key,
]);

export const suggestedAmounts = ['15', '50', '100', 'Other'];

export const toastSettings = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const TIP_MESSAGES = {
  nonExistedUsernameMessage: () => {
    return 'There is no teacher with this user name in our records, you can try their email address and we will send them an invite to join and collect your generous tip.';
  },
  nonExistedTeacherMessage: ({email}) => {
    return (
      <div>
        Thanks for considering tipping this teacher. The owner of <b>{email}</b>{' '}
        is not part of our platform yet, however, we'll invite to join and
        collect your tip as soon as the payment is completed.
      </div>
    );
  },
  verifiedTeacherMessage: ({displayName, username}) => {
    return (
      <div>
        Thank you for considering tipping <b>{displayName || username}</b>.
        We'll notify them as soon as the payment is completed.
      </div>
    );
  },
};

export const DASHBOARD_WIDGETS = {
  totalTippers: {
    label: 'Total Tippers',
    chart: <TotalTippersApexChart />,
  },
  totalTipsAmount: {
    label: 'Total Tips Amount',
    chart: <TotalTipsAmountApexChart />,
  },
  totalNumberOfTips: {
    label: 'Total Tips',
    chart: <TotalTipsApexChart />,
  },
  averageTipAmount: {
    label: 'Average Tip Amount',
    chart: <AverageTipApexChart />,
  },
};

export const DASHBOARD_WIDGETS_ARR = Object.keys(DASHBOARD_WIDGETS).map(
  (key) => [
    DASHBOARD_WIDGETS[key]['label'],
    DASHBOARD_WIDGETS[key]['chart'],
    key,
  ]
);

export const TRANSACTION_TYPES = {
  all: {
    label: 'All',
    value: 'all',
    notSpecificType: true,
  },
  tip: {
    label: 'Tips',
    value: 'tip',
    icon: (
      <badge style={{width: '70px'}} className="badge bg-success text-white">
        Tip
      </badge>
    ),
  },
  // tax: {
  //   label: 'Taxes',
  //   value: 'tax',
  //   icon: <i className="text-info fa fa-calendar"></i>,
  // },
  fee: {
    label: 'Fees',
    value: 'fee',
    icon: (
      <badge style={{width: '70px'}} className="badge bg-info text-white">
        Fee
      </badge>
    ),
  },
  disbursement: {
    label: 'Disbursements',
    value: 'disbursement',
    icon: (
      <badge style={{width: '70px'}} className="badge bg-secondary text-white">
        Tip
      </badge>
    ),
  },
  refund: {
    label: 'Refunds',
    value: 'refund',
    icon: (
      <badge style={{width: '70px'}} className="badge bg-danger text-white">
        Refund
      </badge>
    ),
  },
};

export const TRANSACTION_STATUS = {
  pending: {
    label: 'Pending',
    value: 'pending',
    color: 'warning',
  },
  cancelled: {
    label: 'Cancelled',
    value: 'cancelled',
    color: 'danger',
  },
  cleared: {
    label: 'Cleared',
    value: 'cleared',
    color: 'success',
  },
};
