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
]);

export const suggestedAmounts = ['10', '50', '100', 'Other'];

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
