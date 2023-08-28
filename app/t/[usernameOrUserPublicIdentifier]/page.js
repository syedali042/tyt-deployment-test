'use client';
// React
import {useEffect} from 'react';
// Redux
import {useDispatch} from 'react-redux';
import {initializeDirectTip} from '@/shared/redux/slices/tip';
import Tip from '@/shared/components/tip/Tip';

const DirectTip = ({params}) => {
  const dispatch = useDispatch();
  const {usernameOrUserPublicIdentifier} = params;
  useEffect(() => {
    const initializeDirectTipProcess = async () =>
      await dispatch(initializeDirectTip({usernameOrUserPublicIdentifier}));
    if (usernameOrUserPublicIdentifier) {
      initializeDirectTipProcess();
    }
  }, []);
  return <Tip />;
};

export default DirectTip;
