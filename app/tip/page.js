'use client';
// React
import {useEffect} from 'react';
// Redux
import {useDispatch} from 'react-redux';
import {resetTipState} from '@/shared/redux/slices/tip';
// Components
import Tip from '@/shared/components/tip/Tip';

export default function GetStarted() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetTipState());
  }, []);
  return <Tip />;
}
