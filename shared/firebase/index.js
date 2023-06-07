import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {config} from '../utils/constants/firebase/config';

const environment = process.env.NEXT_PUBLIC_ENV;
// Initialize Firebase
export const app = initializeApp(config[environment]);

export const auth = getAuth(app);
