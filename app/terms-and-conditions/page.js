'use client';
import {Stack} from 'react-bootstrap';
import {DUMMY_TEXTS} from '@/shared/constants';
import {
  MainHeading,
  SubHeading,
  Paragraph,
} from '@/shared/components/terms-and-privacy';
const TermsAndConditions = () => {
  return (
    <Stack className="container" style={{padding: '40px 20px 100px 20px'}}>
      <MainHeading text={'Terms & Conditions'} />
      <SubHeading text={DUMMY_TEXTS.headingOne} />
      <Paragraph text={DUMMY_TEXTS.paragraphOne} />

      <SubHeading text={DUMMY_TEXTS.headingTwo} />
      <Paragraph text={DUMMY_TEXTS.paragraphTwo} />

      <SubHeading text={DUMMY_TEXTS.headingThree} />
      <Paragraph text={DUMMY_TEXTS.paragraphThree} />
    </Stack>
  );
};

export default TermsAndConditions;
