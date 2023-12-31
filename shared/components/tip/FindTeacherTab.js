'use client';
// Bootstrap
import {Stack, Row, Col, Button, Alert} from 'react-bootstrap';
// Mui
import {CircularProgress} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getActiveStep,
  getErrors,
  getIsPaymentRequestLoading,
  getTeacherUsernameOrEmail,
  setTeacherUsernameOrEmail,
  setTipErrors,
  verifyUserToTip,
} from '@/shared/redux/slices/tip';
// Components
import {FormGroupInput} from '@/shared/components/bootstrap/FormGroupInput';
import TipMessage from './TipMessage';
import {toast} from 'react-toastify';
import {toastSettings} from '@/shared/constants';

const FindTeacherTab = () => {
  const isLoading = useSelector(getIsPaymentRequestLoading);
  const dispatch = useDispatch();

  const activeStep = useSelector(getActiveStep);

  const error = useSelector(getErrors);

  const teacherUsernameOrEmail = useSelector(getTeacherUsernameOrEmail);

  const handleChangeTeacherUsernameOrEmail = (value) =>
    dispatch(setTeacherUsernameOrEmail({usernameOrEmail: value}));

  const handleEnterKeyPressEvent = async (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      await verifyUser();
    }
  };

  const verifyUser = async () => {
    if (teacherUsernameOrEmail.length >= 3) await dispatch(verifyUserToTip());
    else
      toast.error(
        'Please enter a valid email address or username',
        toastSettings
      );
  };

  return (
    <Stack className={`${activeStep !== 1 && 'd-none'}`}>
      <TipMessage
        message={error?.message}
        onClick={() => dispatch(setTipErrors({error: null}))}
        icon={<CancelIcon />}
      />
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <FormGroupInput
            label={'Email/Username of the teacher you want to tip'}
            labelColor={'#ffffff'}
            register={() => {}}
            placeholder="Username or Email"
            value={teacherUsernameOrEmail}
            onChange={(event) =>
              handleChangeTeacherUsernameOrEmail(event.target.value)
            }
            onKeyDown={handleEnterKeyPressEvent}
            style={{
              padding: '15px',
              fontSize: '16px',
              width: '100%',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={{span: 2, offset: 5}}>
          <Button
            variant="secondary"
            onClick={() => verifyUser()}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
            }}
          >
            {isLoading ? (
              <CircularProgress
                sx={{transaform: 'translateY(10%)'}}
                size={'20px'}
                color="inherit"
              />
            ) : (
              'Verify'
            )}
          </Button>
        </Col>
      </Row>
    </Stack>
  );
};

export default FindTeacherTab;
