'use client';
// React
import {useState} from 'react';
// React Bootstrap
import {Form, InputGroup} from 'react-bootstrap';
// Components
import FormFieldError from '../FormFieldError';

export const FormGroupInput = ({
  label,
  name,
  type,
  register,
  error,
  placeholder,
  labelColor,
  ...others
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Form.Group className="text-start form-group" controlId="formpassword">
        {label && (
          <Form.Label style={{color: labelColor || 'inherit'}}>
            {label}
          </Form.Label>
        )}
        <InputGroup>
          <Form.Control
            className="form-control form-control-custom"
            placeholder={placeholder}
            name={name}
            {...register(name)}
            type={!showPassword && type === 'password' ? 'password' : 'text'}
            {...others}
          />
          {type === 'password' && (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="input-icon"
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                zIndex: 9999,
                cursor: 'pointer',
              }}
            >
              <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
            </div>
          )}
        </InputGroup>
        <FormFieldError error={error} />
      </Form.Group>
    </>
  );
};
