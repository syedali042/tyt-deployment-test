'use client';
import {
  getCurrentUser,
  updateUser,
  userActions,
} from '@/shared/redux/slices/user';
import React from 'react';
import {Container, Row, Col, Image, Stack, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {FormGroupInput} from '../bootstrap/FormGroupInput';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {updateProfile} from 'firebase/auth';
import {auth as firebaseAuth} from '@/shared/firebase';
import {uploadAttachment} from '@/shared/redux/slices/generalBackendCalls';

const UserInfo = () => {
  const currentUser = useSelector(getCurrentUser);
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: {
      displayName: currentUser?.displayName,
      username: currentUser?.username,
      email: currentUser?.email,
      photoURL: currentUser?.photoURL,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: {errors, isSubmitSuccessful, isSubmitting},
  } = methods;
  const values = watch();

  const onSubmit = (data) => {
    const obj = {
      displayName: data.displayName,
      photoURL: data.photoURL,
    };
    updateProfile(firebaseAuth?.currentUser, obj)
      .then(() => {
        dispatch(
          userActions.setCurrentUser({
            ...currentUser,
            photoURL: firebaseAuth?.currentUser?.photoURL,
            displayName: firebaseAuth?.currentUser?.displayName,
          })
        );
        dispatch(
          updateUser({
            userDataToUpdate: {
              photoURL: firebaseAuth?.currentUser?.photoURL,
              displayName: firebaseAuth?.currentUser?.displayName,
              userInternalId: currentUser?.userInternalId,
            },
          })
        );
      })
      .catch((error) => {
        setError('displayName', {message: error.message});
      });
  };
  const handleLogo = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    const formData = new FormData();
    formData.append('attachment', e.target.files[0]);
    formData.append('type', 'profile');
    const urlArray = await uploadAttachment(formData);
    setValue('photoURL', urlArray[0]);
    onSubmit(values);
  };

  return (
    <Container>
      <Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col
            lg={12}
            md={12}
            sm={12}
            xxl={12}
            className="d-flex flex-column flex-sm-row align-items-center"
            style={{height: '100%'}}
          >
            <label
              className="p-5"
              style={{
                background: '#fffffc',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            >
              <input
                className="d-none"
                onChange={(e) => handleLogo(e)}
                type="file"
                id="myfile"
                name="myfile"
                accept="image/*"
              />
              <Image
                src={
                  image
                    ? image
                    : values.photoURL
                    ? values.photoURL
                    : '/assets/images/users/avatar.png'
                }
                alt="user_image"
                height={150}
                width={150}
                className="rounded"
              />
            </label>
            <Stack className="d-flex flex-column align-items-center">
              <FormGroupInput
                label={'Display Name'}
                name={'displayName'}
                type={'text'}
                register={register}
                error={errors?.displayName?.message}
                placeholder={'Display Name'}
                required
                style={{width: '15rem'}}
              />
              <FormGroupInput
                label={'Username'}
                name={'username'}
                type={'text'}
                register={register}
                error={errors?.username?.message}
                placeholder={'Username'}
                required
                style={{width: '15rem'}}
                disabled={true}
              />
              <FormGroupInput
                label={'Email'}
                name={'email'}
                type={'email'}
                register={register}
                error={errors?.email?.message}
                placeholder={'Email'}
                required
                style={{width: '15rem'}}
                disabled={true}
              />
            </Stack>
            {values.displayName != currentUser?.displayName && (
              <div
                className="ms-2 d-flex align-items-start"
                style={{height: '100%', paddingTop: '2.3rem'}}
              >
                <Button
                  type="submit"
                  variant="success"
                  className="fe fe-check-circle"
                  style={{fontSize: 23}}
                />
              </div>
            )}
          </Col>
        </form>
      </Row>
    </Container>
  );
};

export default UserInfo;
