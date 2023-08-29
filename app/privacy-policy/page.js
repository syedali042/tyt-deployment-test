'use client';
import {Typography} from '@mui/material';
import {Stack} from 'react-bootstrap';
import {TermsAndPrivacyTextStyles} from '@/shared/constants';

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
        Information Collection, Use, and Sharing
      </Typography>

      <Typography
        color={'#76797c !important'}
        fontSize={TermsAndPrivacyTextStyles.text.fontSize}
        letterSpacing={TermsAndPrivacyTextStyles.text.letterSpacing}
        lineHeight={TermsAndPrivacyTextStyles.text.lineHeight}
        className="pt-5"
      >
        We are the sole owners of the information collected on this site. We
        only have access to/collect information that you voluntarily give us via
        email or other direct contact from you. We will not sell or rent this
        information to anyone. We will use your information to respond to you,
        regarding the reason you contacted us. We will not share your
        information with any third party outside of our organization, other than
        as necessary to fulfill your request, e.g. to ship an order. Unless you
        ask us not to, we may contact you via email in the future to tell you
        about specials, new products or services, or changes to this privacy
        policy.
      </Typography>

      <Typography
        fontWeight={TermsAndPrivacyTextStyles.sub.fontWeight}
        color={'#4c6281 !important'}
        fontSize={TermsAndPrivacyTextStyles.sub.fontSize}
        className="pt-5"
      >
        Information Security
      </Typography>

      <Typography
        color={'#76797c !important'}
        fontSize={TermsAndPrivacyTextStyles.text.fontSize}
        letterSpacing={TermsAndPrivacyTextStyles.text.letterSpacing}
        lineHeight={TermsAndPrivacyTextStyles.text.lineHeight}
        className="pt-5"
      >
        We take precautions to protect your information. When you submit
        sensitive information via the website, your information is protected
        both online and offline. Wherever we collect sensitive information (such
        as credit card data), that information is encrypted and securely
        transmitted to us. You can verify this by looking for a lock icon in the
        address bar and looking for “HTTPS” at the beginning of the address of
        the Web page. While we use encryption to protect sensitive information
        transmitted online, we also protect your information offline. Only
        employees who need the information to perform a specific job (for
        example, billing or customer service) are granted access to personally
        identifiable information. The computers/servers in which we store
        personally identifiable information are kept in a secure environment
      </Typography>

      <Typography
        fontWeight={TermsAndPrivacyTextStyles.sub.fontWeight}
        color={'#4c6281 !important'}
        fontSize={TermsAndPrivacyTextStyles.sub.fontSize}
        className="pt-5"
      >
        Notification of Changes
      </Typography>

      <Typography
        color={'#76797c !important'}
        fontSize={TermsAndPrivacyTextStyles.text.fontSize}
        letterSpacing={TermsAndPrivacyTextStyles.text.letterSpacing}
        lineHeight={TermsAndPrivacyTextStyles.text.lineHeight}
        className="pt-5"
      >
        We have the right to make changes to the clauses mentioned in this terms
        and conditions document when they see fit. Continued use of this website
        will mean you agree to the changes that take place within the website in
        the future. In the event of a change within the website&apos;s terms and
        conditions, you will be duly informed through mail or when you land on
        our website. Any changes to this policy will be mentioned on our website
        a month before the change has been made. Therefore, you are advised to
        read this privacy policy on a regular basis.
      </Typography>
    </Stack>
  );
};

export default PrivacyPolicy;
