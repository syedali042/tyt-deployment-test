import {Stack} from 'react-bootstrap';
import {SEND_TIP_TABS, SEND_TIP_TABS_ARR} from '@/shared/utils/tipUtils';

const StepsHeader = ({tabSettings, setTabSettings}) => {
  const activateTab = async ({tab}) => {
    const {active: activeTab, steps} = tabSettings;
    if (activeTab == tab) {
      return;
    }

    setTabSettings({
      active: tab,
      steps:
        tab == SEND_TIP_TABS.findTeacherTab.name
          ? ['find-teacher-tab']
          : tab == SEND_TIP_TABS.selectAmountTab.name
          ? ['find-teacher-tab', 'select-amount-tab']
          : ['find-teacher-tab', 'select-amount-tab', 'checkout-tab'],
    });
  };
  return (
    <Stack className="md-stepper-horizontal orange">
      {SEND_TIP_TABS_ARR.map((tab, index) => {
        const tabLabel = tab[0];
        const tabName = tab[1];
        return (
          <Stack
            className={`md-step ${
              tabSettings.steps.includes(tabName) && 'active'
            }`}
            onClick={() => activateTab({tab: tabName})}
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
