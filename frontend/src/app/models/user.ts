export interface User {
  userName: string;
  token?: string;
  id?: string;
  email?: string;
  role?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}
