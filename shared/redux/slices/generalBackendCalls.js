import {tokenVariable} from '@/shared/config';
import axios from '../axios';

export const uploadAttachment = async (data) => {
  const response = await axios.post('/files', data, {
    headers: {
      [tokenVariable]: JSON.parse(localStorage.getItem([tokenVariable])),
    },
  });
  const urlArray = response.data.body.urls;
  return urlArray;
};
