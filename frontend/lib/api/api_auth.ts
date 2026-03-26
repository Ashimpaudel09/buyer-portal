const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { LoginInput, RegisterInput, AuthResponse, User } from "@/types/auth";
import { redirect } from "next/navigation";



export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
};

export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const logoutUser = async (): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });   
  return res.json();
};


