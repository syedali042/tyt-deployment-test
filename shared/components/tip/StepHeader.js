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
  getActiveStep,
  setActiveStep,
} from '@/shared/redux/slices/tip';
// Utils
import {commonValidationsForTabs} from '@/shared/utils/tipUtils';
// Constants
import {SEND_TIP_TABS_ARR, toastSettings} from '@/shared/constants';

const StepsHeader = ({toast}) => {
  const dispatch = useDispatch();

  const activeStep = useSelector(getActiveStep);

  const currentTeacher = useSelector(getCurrentTeacher);

  const amount = useSelector(getTipAmount);

  const clientSecret = useSelector(getClientSecret);

  const teacherUsernameOrEmail = useSelector(getTeacherUsernameOrEmail);

  const validateTabShifting = async (tab) => {
    if (tab == 1) return {success: true};

    if (tab == 2) {
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

    if (tab == 3) {
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
        await dispatch(
          initializeOrUpdateTipProcess({action: 'initializeCheckout'})
        );
        return {
          success: true,
        };
      }

      return {success: true};
    }
  };

  const activateTab = async ({step}) => {
    if (activeStep == step) return;

    const {success, error} = await validateTabShifting(step);

    if (!success) return toast.error(error, toastSettings);

    await dispatch(setActiveStep(step));
  };
  return (
    <Stack className="md-stepper-horizontal orange">
      {SEND_TIP_TABS_ARR.map((tab, index) => {
        const tabLabel = tab[0];
        return (
          <Stack
            className={`md-step ${activeStep >= index + 1 && 'active'}`}
            onClick={() => activateTab({step: index + 1})}
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
