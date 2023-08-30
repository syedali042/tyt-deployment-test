'use client';
import {Stack} from 'react-bootstrap';
import {MainHeading, RenderData} from '@/shared/components/terms-and-privacy';

const PrivacyPolicy = () => {
  return (
    <Stack className="container" style={{padding: '40px 20px 100px 20px'}}>
      <MainHeading text={'Privacy Policy'} />
      {RenderData()}
    </Stack>
  );
};

export default PrivacyPolicy;
