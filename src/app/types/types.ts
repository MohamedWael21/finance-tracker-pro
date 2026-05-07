export interface User {
  _id?: string;
  email: string;
  name: string;
  role: string;
  avatar?: { secure_url: string; public_id: string } | null;
  plan: 'free' | 'premium';
  createdAt?: string;
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
