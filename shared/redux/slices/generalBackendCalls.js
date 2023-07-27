import {tokenVariable} from '@/shared/config';
import axios from '../axios';

export const uploadAttachment = async (data) => {
  const response = await axios.post('/files', data, {
    headers: {
      [tokenVariable]: JSON.parse(localStorage.getItem('token')),
    },
  });
  const urlArray = response.data.body;
  return urlArray;
};
