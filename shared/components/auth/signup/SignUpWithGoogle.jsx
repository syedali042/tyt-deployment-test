import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {createUser} from '@/shared/redux/slices/user';
import AppModal from '@/shared/components/AppModal';
import {useState} from 'react';
import {auth as firebaseAuth} from '@/shared/firebase';
import {Stack, Image} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/navigation';

export const SignUpWithGoogle = ({isUsernameVerified, setError, username}) => {
  const dispatch = useDispatch();
  const router = useRouter();
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
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        const additionalInfo = getAdditionalUserInfo(result);
        const {isNewUser} = additionalInfo;
        const {displayName, photoURL, uid, email} = user;
        const createUserObj = {
          firebaseId: uid,
          email,
          username,
          photoURL,
          displayName,
          loginType: 'google',
        };

        if (isNewUser) {
          await dispatch(createUser(createUserObj));
          router.push('/welcome');
        } else {
          handleOpenModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Stack
      style={{
        width: '45%',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
      }}
      className="social-login text-center"
      onClick={() => {
        if (!isUsernameVerified) {
          setError('username', {
            message: 'Please choose a username first',
          });
        } else {
          signUpWithGoogle();
        }
      }}
    >
      <Image
        style={{
          transform: 'translateY(-8%)',
        }}
        src="/assets/images/brand/google.svg"
      />
      <AppModal
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        open={openModal}
        title={'Already a member'}
        description={
          'You are already registered with this email, click below to be redirected to the login page.'
        }
        path={'/auth/login'}
      />
    </Stack>
  );
};
