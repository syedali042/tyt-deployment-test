import axios from 'axios';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1` || '',
});
console.log(process.env.NEXT_PUBLIC_SERVER_URL);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      response: {
        data: {message},
      },
    } = error;

    if (message == 'invalid token') {
      localStorage.removeItem('redux-user');
      localStorage.removeItem('redux-transaction');
      window.location.href = '/auth/login';
      return;
    }

    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default axiosInstance;
