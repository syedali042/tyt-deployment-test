'use client';

// React Toast
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// React Bootstrap
import {Stack, Container, Image} from 'react-bootstrap';
// Components
import StepsHeader from '@/shared/components/tip/StepHeader';
import FindTeacherTab from '@/shared/components/tip/FindTeacherTab';
import SelectAmountTab from '@/shared/components/tip/SelectAmountTab';
import CheckoutTab from '@/shared/components/tip/CheckoutTab';
import './page.css';

export default function Tip() {
  return (
    <>
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
              <StepsHeader toast={toast} />
              <FindTeacherTab />
              <SelectAmountTab />
              <CheckoutTab />
            </Stack>
          </Container>
        </Stack>
      </Stack>
      <ToastContainer />
    </>
  );
}
