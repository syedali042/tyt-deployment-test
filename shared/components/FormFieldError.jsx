import {Stack} from 'react-bootstrap';
const FormFieldError = ({error}) => {
  return (
    <Stack className="px-1" style={{fontSize: '0.8rem', color: '#FFFFCC'}}>
      {error}
    </Stack>
  );
};
export default FormFieldError;
