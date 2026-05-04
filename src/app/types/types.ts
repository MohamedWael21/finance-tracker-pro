export interface User {
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: { secure_url: string; public_id: string };
  plan: 'free' | 'premium';
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
