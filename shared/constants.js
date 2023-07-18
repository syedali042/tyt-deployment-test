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
