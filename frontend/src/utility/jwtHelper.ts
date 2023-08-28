import jwt_decode from 'jwt-decode';
import { User } from '../app/models'; // Make sure to import the User type from the correct path

export function decodeJwtToken(token: string): User {
  const decodedToken: any = jwt_decode(token);

  const loggedInUser: User = {
    userName: decodedToken.unique_name,
    id: decodedToken.nameid,
    email: decodedToken.email,
    role: decodedToken.role,
  };

  return loggedInUser;
}
