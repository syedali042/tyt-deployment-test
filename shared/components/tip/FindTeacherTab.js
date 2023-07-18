'use client';
// Components
import {FormGroupInput} from '@/shared/components/bootstrap/FormGroupInput';
// Bootstrap
import {Stack, Row, Col, Button, Alert} from 'react-bootstrap';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getErrors,
  getTeacherUsernameOrEmail,
  setTeacherUsernameOrEmail,
  setTipErrors,
  verifyUserToTip,
} from '@/shared/redux/slices/tip';
// Icons
import {CircularProgress} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState} from 'react';

const FindTeacherTab = ({tabSettings, setTabSettings}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const errors = useSelector(getErrors);

  const teacherUsernameOrEmail = useSelector(getTeacherUsernameOrEmail);

  const handleChangeTeacherUsernameOrEmail = (value) =>
    dispatch(setTeacherUsernameOrEmail({usernameOrEmail: value}));

  const handleInputKeyPressEvent = async (event) => {
    if (event.key == 'Enter') {
      await verifyUser();
      event.preventDefault();
    }
  };

  const verifyUser = async () => {
    setIsLoading(true);
    try {
      await dispatch(verifyUserToTip());
      setTabSettings({
        active: 'select-amount-tab',
        steps: ['find-teacher-tab', 'select-amount-tab'],
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(true);
    }
  };

  return (
    <Stack
      className={`${tabSettings.active !== 'find-teacher-tab' && 'd-none'}`}
    >
      <Row>
        <Col md={{span: 8, offset: 2}}>
          {errors && (
            <Alert className="my-2" variant={'danger'} style={{color: '#fff'}}>
              <Stack className="d-flex align-items-center justify-content-center">
                <Stack style={{width: 'auto'}}>
                  <CancelIcon
                    onClick={() => dispatch(setTipErrors({errors: null}))}
                    style={{
                      transform: 'translateY(15%) scale(1.7)',
                      cursor: 'pointer',
                    }}
                  />
                </Stack>
                &nbsp;&nbsp;&nbsp;
                <Stack>{errors.message}</Stack>
              </Stack>
            </Alert>
          )}
        </Col>
      </Row>
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
            onKeyDown={handleInputKeyPressEvent}
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
