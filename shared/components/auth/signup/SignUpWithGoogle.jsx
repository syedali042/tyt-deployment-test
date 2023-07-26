// React
import {useState} from 'react';
// Next
import {useRouter} from 'next/navigation';
// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  createUser,
  getInvitedUser,
  updateUser,
} from '@/shared/redux/slices/user';
// Firebase
import {auth as firebaseAuth} from '@/shared/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
// React Bootstrap
import {Stack, Image} from 'react-bootstrap';
// Components
import AppModal from '@/shared/components/AppModal';

export const SignUpWithGoogle = ({isUsernameVerified, setError, username}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const invitedUser = useSelector(getInvitedUser);
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
        const {displayName, photoURL, uid, email, accessToken} = user;
        const userObj = {
          firebaseId: uid,
          email,
          username,
          photoURL,
          displayName,
          accessToken,
          loginType: 'google',
        };

        if (isNewUser) {
          if (!invitedUser) await dispatch(createUser(userObj));
          else {
            userObj.id = invitedUser?.userInternalId;
            userObj.verified = true;
            await dispatch(updateUser(userObj));
          }
          router.push('/dashboard/home');
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
