// React Bootstrap
import {Stack} from 'react-bootstrap';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentTeacher,
  getTipAmount,
  getClientSecret,
  getTeacherUsernameOrEmail,
  initializeOrUpdateTipProcess,
  getStepsSettings,
  setStepsSettings,
} from '@/shared/redux/slices/tip';
// Utils
import {commonValidationsForTabs} from '@/shared/utils/tipUtils';
// Constants
import {
  SEND_TIP_TABS,
  SEND_TIP_TABS_ARR,
  toastSettings,
} from '@/shared/constants';

const StepsHeader = ({toast}) => {
  const dispatch = useDispatch();

  const stepsSettings = useSelector(getStepsSettings);

  const currentTeacher = useSelector(getCurrentTeacher);

  const amount = useSelector(getTipAmount);

  const clientSecret = useSelector(getClientSecret);

  const teacherUsernameOrEmail = useSelector(getTeacherUsernameOrEmail);

  const validateTabShifting = async (tab) => {
    if (tab == SEND_TIP_TABS.findTeacherTab.name) return {success: true};

    if (tab == SEND_TIP_TABS.selectAmountTab.name) {
      const {success, error} = commonValidationsForTabs({
        currentTeacher,
        teacherUsernameOrEmail,
      });

      if (!success) {
        return {success: false, error};
      } else {
        return {success: true};
      }
    }

    if (tab == SEND_TIP_TABS.checkoutTab.name) {
      const {success, error} = commonValidationsForTabs({
        currentTeacher,
        teacherUsernameOrEmail,
      });

      if (!success) return {success: false, error};

      if (amount < 1)
        return {
          success: false,
          error: 'Amount must be greater than 0',
        };

      if (clientSecret == '') {
        await dispatch(initializeOrUpdateTipProcess());
        return {
          success: true,
        };
      }

      return {success: true};
    }
  };

  const activateTab = async ({step}) => {
    if (stepsSettings?.activeStep == step) return;

    const {success, error} = await validateTabShifting(step);

    if (!success) return toast.error(error, toastSettings);
    await dispatch(
      setStepsSettings({
        activeStep: step,
        completedSteps:
          step == SEND_TIP_TABS.findTeacherTab.name
            ? ['find-teacher-tab']
            : step == SEND_TIP_TABS.selectAmountTab.name
            ? ['find-teacher-tab', 'select-amount-tab']
            : ['find-teacher-tab', 'select-amount-tab', 'checkout-tab'],
      })
    );
  };
  return (
    <Stack className="md-stepper-horizontal orange">
      {SEND_TIP_TABS_ARR.map((tab, index) => {
        const tabLabel = tab[0];
        const tabName = tab[1];
        return (
          <Stack
            className={`md-step ${
              stepsSettings?.completedSteps?.includes(tabName) && 'active'
            }`}
            onClick={() => activateTab({step: tabName})}
            style={{cursor: 'pointer'}}
          >
            <Stack className="md-step-circle">
              <span>{index + 1}</span>
            </Stack>
            <Stack className="md-step-title">{tabLabel}</Stack>
            <Stack className="md-step-bar-left"></Stack>
            <Stack className="md-step-bar-right"></Stack>
          </Stack>
        );
      })}
      {/*  */}
    </Stack>
  );
};
export default StepsHeader;
