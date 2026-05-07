export interface Avatar {
  secure_url: string;
  public_id: string;
}

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  role: string;
  avatar: Avatar | null;
  plan: 'free' | 'premium';
  createdAt?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface UserProfileResponse {
  success: boolean;
  profile: UserProfile;
}

export interface UpdateProfileResponse {
  success: boolean;
  updatedProfile: UserProfile;
}

export interface AvatarResponse {
  success: boolean;
  user: UserProfile;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface ChatApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatApiResponse {
  success: boolean;
  data: string;
}
