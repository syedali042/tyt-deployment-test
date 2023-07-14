'use client';
import './page.css';
import {Stack, Row, Container, Image, Alert, Col} from 'react-bootstrap';
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import StepsHeader from '@/shared/components/tip/StepHeader';
import FindTeacherTab from '@/shared/components/tip/FindTeacherTab';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectAmountTab from '@/shared/components/tip/SelectAmountTab';
import CheckoutTab from '@/shared/components/tip/CheckoutTab';
import {useState} from 'react';

export default function GetStarted() {
  const [tabSettings, setTabSettings] = useState({
    active: 'find-teacher-tab',
    steps: ['find-teacher-tab'],
  });

  return (
    <>
      <Authenticationlayout>
        <Stack style={{backgroundColor: '#2D476B'}}>
          <Stack className="tip-container">
            <Container>
              <Stack className="tip-wrapper p-3 p-sm-6 p-md-6 p-lg-6">
                <center>
                  <Image
                    src={'/assets/images/brand/logo-white.png'}
                    alt="logo"
                    style={{width: '220px'}}
                  />
                </center>
                <StepsHeader
                  tabSettings={tabSettings}
                  setTabSettings={setTabSettings}
                />
                <FindTeacherTab tabSettings={tabSettings} />
                <SelectAmountTab tabSettings={tabSettings} />
                <CheckoutTab tabSettings={tabSettings} />
              </Stack>
            </Container>
          </Stack>
        </Stack>
        <ToastContainer />
      </Authenticationlayout>
    </>
  );
}
