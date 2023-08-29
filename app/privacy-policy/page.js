'use client';
import {Typography} from '@mui/material';
import {Stack} from 'react-bootstrap';
import {TermsAndPrivacyTextStyles} from '@/shared/constants';
import {DUMMY_TEXTS} from '@/shared/constants';
const PrivacyPolicy = () => {
  return (
    <Stack className="container" style={{padding: '40px 20px 100px 20px'}}>
      <Typography
        fontWeight={TermsAndPrivacyTextStyles.main.fontWeight}
        fontSize={TermsAndPrivacyTextStyles.main.fontSize}
        className="pt-5"
      >
        Privacy Policy
      </Typography>

      <Typography
        fontWeight={TermsAndPrivacyTextStyles.sub.fontWeight}
        color={'#4c6281 !important'}
        fontSize={TermsAndPrivacyTextStyles.sub.fontSize}
        className="pt-5"
      >
        {DUMMY_TEXTS.headingOne}
      </Typography>

      <Typography
        color={'#76797c !important'}
        fontSize={TermsAndPrivacyTextStyles.text.fontSize}
        letterSpacing={TermsAndPrivacyTextStyles.text.letterSpacing}
        lineHeight={TermsAndPrivacyTextStyles.text.lineHeight}
        className="pt-5"
      >
        {DUMMY_TEXTS.paragraphOne}
      </Typography>

      <Typography
        fontWeight={TermsAndPrivacyTextStyles.sub.fontWeight}
        color={'#4c6281 !important'}
        fontSize={TermsAndPrivacyTextStyles.sub.fontSize}
        className="pt-5"
      >
        {DUMMY_TEXTS.headingTwo}
      </Typography>

      <Typography
        color={'#76797c !important'}
        fontSize={TermsAndPrivacyTextStyles.text.fontSize}
        letterSpacing={TermsAndPrivacyTextStyles.text.letterSpacing}
        lineHeight={TermsAndPrivacyTextStyles.text.lineHeight}
        className="pt-5"
      >
        {DUMMY_TEXTS.paragraphTwo}
      </Typography>

      <Typography
        fontWeight={TermsAndPrivacyTextStyles.sub.fontWeight}
        color={'#4c6281 !important'}
        fontSize={TermsAndPrivacyTextStyles.sub.fontSize}
        className="pt-5"
      >
        {DUMMY_TEXTS.headingThree}
      </Typography>

      <Typography
        color={'#76797c !important'}
        fontSize={TermsAndPrivacyTextStyles.text.fontSize}
        letterSpacing={TermsAndPrivacyTextStyles.text.letterSpacing}
        lineHeight={TermsAndPrivacyTextStyles.text.lineHeight}
        className="pt-5"
      >
        {DUMMY_TEXTS.paragraphThree}
      </Typography>
    </Stack>
  );
};

export default PrivacyPolicy;
