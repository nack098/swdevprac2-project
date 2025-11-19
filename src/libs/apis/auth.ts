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
    },
  );

  return { data: raw.data, status: raw.status, statusText: raw.statusText };
}

export async function login(data: LoginData) {
  return await axios.post(ROOT_URL + "/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function logout() {
  return await axios.get(ROOT_URL + "/logout");
}

export async function me() {
  return await axios.get(ROOT_URL + "me");
}
