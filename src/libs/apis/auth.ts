"use server";

import axios from "axios";

const ROOT_URL: string = `${process.env.BACKEND_URL}/auth`;

export async function register(data: RegisterData) {
  const raw = await axios.post(
    ROOT_URL + "/register",
    {
      ...data,
      role: "member",
      createdAt: new Date().toISOString().split("T")[0],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) => {
        return status < 500;
      },
    },
  );

  return { data: raw.data, status: raw.status, statusText: raw.statusText };
}

export async function login(data: LoginData) {
  const res = await axios.post(ROOT_URL + "/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
    validateStatus: (status) => {
      return status < 500;
    },
  });

  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function logout(token: string) {
  const res = await axios.get(ROOT_URL + "/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { status: res.status, statusText: res.statusText };
}

export async function me(token: string) {
  const res = await axios.get(ROOT_URL + "/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { data: res.data, status: res.status, statusText: res.statusText };
}
