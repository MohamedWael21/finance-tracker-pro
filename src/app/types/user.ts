export interface User {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}