import jwtDecode from 'jwt-decode';

export const decodeJwtToken = ({token}) => {
  return jwtDecode(token);
};
