import {Stack} from 'react-bootstrap';
import {auth as firebaseAuth} from '@/shared/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {signInUser} from '@/shared/redux/slices/user';
import {useState} from 'react';
import AppModal from '../../AppModal';
import {useRouter} from 'next/navigation';

export const SignInWithGoogle = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    signInWithPopup(firebaseAuth, provider)
      .then(async (result) => {
        const user = result.user;
        const additionalInfo = getAdditionalUserInfo(result);

        const {isNewUser} = additionalInfo;

        if (isNewUser) {
          deleteUser(user).then(() => {
            handleOpenModal();
          });
        } else {
          await dispatch(signInUser(user));
          router.push('/dashboard/home');
        }
      })
      .catch((error) => {
        console.log(error);
        ///// Set It Later
      });
  };
  return (
    <Stack className="d-flex justify-content-center">
      <Stack
        onClick={() => signUpWithGoogle()}
        className="social-login me-4 text-center"
      >
        <i className="fa fa-google"></i>
      </Stack>
      <AppModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        open={openModal}
        title={'Not a member'}
        description={
          'You are not registered yet with this email, click below to be redirected to the sign up page.'
        }
        path={'/'}
      />
    </Stack>
  );
};
