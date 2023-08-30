import {Typography} from '@mui/material';
import {DUMMY_TEXTS, TermsAndPrivacyTextStyles} from '@/shared/constants';

export const MainHeading = ({text}) => {
  return (
    <Typography
      fontWeight={TermsAndPrivacyTextStyles.main.fontWeight}
      fontSize={TermsAndPrivacyTextStyles.main.fontSize}
      className="pt-5"
    >
      {text}
    </Typography>
  );
};

export const SubHeading = ({text}) => {
  return (
    <Typography
      fontWeight={TermsAndPrivacyTextStyles.sub.fontWeight}
      color={'#4c6281 !important'}
      fontSize={TermsAndPrivacyTextStyles.sub.fontSize}
      className="pt-5"
    >
      {text}
    </Typography>
  );
};

export const Paragraph = ({text}) => {
  return (
    <Typography
      color={'#76797c !important'}
      fontSize={TermsAndPrivacyTextStyles.text.fontSize}
      letterSpacing={TermsAndPrivacyTextStyles.text.letterSpacing}
      lineHeight={TermsAndPrivacyTextStyles.text.lineHeight}
      className="pt-5"
    >
      {text}
    </Typography>
  );
};

export const RenderData = () => {
  return Object.keys(DUMMY_TEXTS).map((key) => {
    if (key.includes('heading')) return <SubHeading text={DUMMY_TEXTS[key]} />;
    else return <Paragraph text={DUMMY_TEXTS[key]} />;
  });
};
