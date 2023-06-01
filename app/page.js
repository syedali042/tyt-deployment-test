'use client';
import './page.css';
import {useRouter} from 'next/navigation';
import {Stack, Row, Container, Image, Button, Col, Form} from 'react-bootstrap';
import {useForm, FormProvider} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import FormFieldError from '@/shared/components/FormFieldError';
export default function GetStarted() {
  let router = useRouter();

  const GetStartedSchema = Yup.object().shape({
    username: Yup.string().min(6).max(40).required('User Name is required'),
  });

  const methods = useForm({
    resolver: yupResolver(GetStartedSchema),
    defaultValues: {
      username: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Stack className="login-img">
        <Stack className="page">
          {/* <!-- CONTAINER OPEN --> */}
          <Row className="col-login mx-auto mt-7"></Row>
          <Container className="container">
            <Stack className="wrap bg-white p-6">
              <Stack className="d-flex justify-content-center">
                <Image
                  src={'/assets/images/brand/logo-dark.png'}
                  style={{width: '200px'}}
                />
              </Stack>
              <FormProvider methods={methods}>
                <h1 className="text-center mt-5">
                  {' '}
                  Set Up Account & Start Getting Your Tips
                </h1>
                <Row
                  className="mx-auto mb-5"
                  style={{width: '30vh', borderBottom: '1px solid #555'}}
                ></Row>
                <Stack className="custom-input">
                  <Row className="get-started-input-row justify-content-center mx-auto">
                    <Col
                      className="default-input-url"
                      style={{transform: 'translateY(12%)'}}
                    >
                      <h1 className="defualt-input-url-text">
                        tipyourteacher.co
                      </h1>
                      <h1 className="defualt-input-url-slash">/</h1>
                    </Col>
                    <Col
                      className="get-started-default-input-container"
                      style={{transform: 'translateY(-5%) translateX(-14%)'}}
                    >
                      <input
                        name={'username'}
                        {...register('username')}
                        placeholder="yourname"
                        className="get-started-default-input"
                      />
                    </Col>
                    <Col className="get-started-default-input-button-container">
                      <Button
                        type="submit"
                        className="get-started-default-input-button btn-primary"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Get started
                      </Button>
                    </Col>
                    <br />
                  </Row>
                  <Stack className="field-error-container mx-auto">
                    <FormFieldError error={errors?.username?.message} />
                  </Stack>
                </Stack>
              </FormProvider>
            </Stack>
          </Container>
          {/* // <!-- CONTAINER CLOSED --> */}
        </Stack>
      </Stack>
    </>
  );
}
