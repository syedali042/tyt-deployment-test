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
      <badge style={{width: '80px'}} className="badge bg-success text-white">
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
      <badge style={{width: '80px'}} className="badge bg-info text-white">
        Fee
      </badge>
    ),
  },
  disbursement: {
    label: 'Disbursements',
    value: 'disbursement',
    icon: (
      <badge style={{width: '80px'}} className="badge bg-secondary text-white">
        Disbursement
      </badge>
    ),
  },
  refund: {
    label: 'Refunds',
    value: 'refund',
    icon: (
      <badge style={{width: '80px'}} className="badge bg-danger text-white">
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
  // cancelled: {
  //   label: 'Cancelled',
  //   value: 'cancelled',
  //   color: 'danger',
  // },
  cleared: {
    label: 'Cleared',
    value: 'cleared',
    color: 'success',
  },
  refunded: {
    label: 'Refunded',
    value: 'refunded',
    color: 'danger',
  },
};

export const IS_DISABLED = {
  isEmailFieldDisabled: ({
    isUsernameVerified,
    invitedUser,
    isEmailDisabled,
  }) => {
    if (!isUsernameVerified) return true;
    return invitedUser && isEmailDisabled;
  },
  isSignUpButtonDisabled: ({
    isUsernameVerified,
    isSubmitting,
    isSubmitSuccessful,
  }) => {
    if (!isUsernameVerified) return true;
    if (isSubmitting) return true;
    if (isSubmitSuccessful) return true;
  },
};

export const TermsAndPrivacyTextStyles = {
  main: {
    fontWeight: 700,
    fontSize: 36,
  },
  sub: {
    fontWeight: 500,
    fontSize: 18,
  },
  text: {
    fontSize: 14,
    letterSpacing: 1,
    lineHeight: 2,
  },
};

// Will be removed later
export const DUMMY_TEXTS = {
  headingOne: 'Information Collection, Use, and Sharing',
  paragraphOne:
    ' We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone. We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order. Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.',
  headingTwo: 'Information Security',
  paragraphTwo:
    'We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline. Wherever we collect sensitive information (such as credit card data), that information is encrypted and securely transmitted to us. You can verify this by looking for a lock icon in the address bar and looking for “HTTPS” at the beginning of the address of the Web page. While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment',
  headingThree: 'Notification of Changes',
  paragraphThree:
    ' We have the right to make changes to the clauses mentioned in this terms and conditions document when they see fit. Continued use of this website will mean you agree to the changes that take place within the website in the future. In the event of a change within the website&apos;s terms and conditions, you will be duly informed through mail or when you land on our website. Any changes to this policy will be mentioned on our website a month before the change has been made. Therefore, you are advised to read this privacy policy on a regular basis.',
};
