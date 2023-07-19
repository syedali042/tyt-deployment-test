import {Row, Col, Alert, Stack} from 'react-bootstrap';
const TipMessage = ({icon, onClick, error}) => {
  return (
    <Row>
      <Col md={{span: 8, offset: 2}}>
        {error && (
          <Alert className="my-2" variant={'danger'} style={{color: '#fff'}}>
            <Stack className="d-flex align-items-center justify-content-center">
              <Stack
                onClick={onClick}
                style={{
                  transform: 'translateY(15%) scale(1.7)',
                  cursor: 'pointer',
                  width: 'auto',
                }}
              >
                {icon}
              </Stack>
              &nbsp;&nbsp;&nbsp;
              <Stack>{error.message || error}</Stack>
            </Stack>
          </Alert>
        )}
      </Col>
    </Row>
  );
};

export default TipMessage;
