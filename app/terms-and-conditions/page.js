'use client';
import {Stack} from 'react-bootstrap';
import {MainHeading, RenderData} from '@/shared/components/terms-and-privacy';

const TermsAndConditions = () => {
  return (
    <Stack className="container" style={{padding: '40px 20px 100px 20px'}}>
      <MainHeading text={'Terms & Conditions'} />
      {RenderData()}
    </Stack>
  );
};

export default TermsAndConditions;
