export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  message?: string;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface User {
  
  id: number;
  name: string;
  email: string;
  role: "buyer" | "admin";
}