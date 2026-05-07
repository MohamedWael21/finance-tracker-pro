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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ChatApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatApiResponse {
  success: boolean;
  data: string;
}

export interface ResetPasswordInput {
  email: string;
}

export interface ResetPasswordConfirmInput {
  password: string;
}

export interface GenericAuthResponse {
  success: boolean;
  message: string;
  token?: string;
}
