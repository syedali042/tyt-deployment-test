'use client';
// React
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const DirectTip = ({params}) => {
  const router = useRouter();
  useEffect(() => {
    router.push('/tip');
  }, []);
};

export default DirectTip;
