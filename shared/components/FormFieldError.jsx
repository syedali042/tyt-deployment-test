import {Stack} from 'react-bootstrap';
const FormFieldError = ({error}) => {
  return (
    <Stack className="text-danger px-1" style={{fontSize: '0.8rem'}}>
      {error}
    </Stack>
  );
};
export default FormFieldError;
