export interface User {
  userName: string;
  token: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
}
