'use client';
import {FormGroupInput} from '@/shared/components/bootstrap/FormGroupInput';

import {Stack, Row, Col, Button, Alert} from 'react-bootstrap';

const FindTeacherTab = ({tabSettings}) => {
  return (
    <Stack
      className={`${tabSettings.active !== 'find-teacher-tab' && 'd-none'}`}
    >
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <FormGroupInput
            label={'Email/Username of the teacher you want to tip'}
            labelColor={'#ffffff'}
            register={() => {}}
            placeholder="Username or Email"
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
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
            }}
          >
            Verify
          </Button>
        </Col>
      </Row>
    </Stack>
  );
};

export default FindTeacherTab;
