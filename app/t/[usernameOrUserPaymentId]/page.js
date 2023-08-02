'use client';
// React
import {useEffect} from 'react';
import {useRouter, useParams} from 'next/navigation';
// React Toast
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// React Bootstrap
import {Stack, Row, Container, Image} from 'react-bootstrap';
//Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentTeacher,
  getErrors,
  getIsPaymentRequestLoading,
  initializeDirectTip,
} from '@/shared/redux/slices/tip';
// Components
import Authenticationlayout from '@/shared/layout-components/layout/authentication-layout';
import StepsHeader from '@/shared/components/tip/StepHeader';
import FindTeacherTab from '@/shared/components/tip/FindTeacherTab';
import SelectAmountTab from '@/shared/components/tip/SelectAmountTab';
import CheckoutTab from '@/shared/components/tip/CheckoutTab';
import '../../tip/page.css';

const DirectTip = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const isPaymentRequestLoading = useSelector(getIsPaymentRequestLoading);
  const {usernameOrUserPaymentId} = params;
  useEffect(() => {
    const initializeDirectTipProcess = async () =>
      await dispatch(initializeDirectTip({usernameOrUserPaymentId}));
    if (usernameOrUserPaymentId) {
      initializeDirectTipProcess();
    }
  }, []);
  return (
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
              {!isPaymentRequestLoading && (
                <>
                  <StepsHeader toast={toast} />
                  <FindTeacherTab />
                  <SelectAmountTab />
                  <CheckoutTab />
                </>
              )}
            </Stack>
          </Container>
        </Stack>
      </Stack>
      <ToastContainer />
    </Authenticationlayout>
  );
};

export default DirectTip;
