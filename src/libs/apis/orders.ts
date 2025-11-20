"use server";

import axios from "axios";

const ROOT_URL = `${process.env.BACKEND_URL}/orders`;

export async function get(token: string) {
  const res = await axios.get(ROOT_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function post(data: OrderCreateData, token: string) {
  console.log(data);
  const res = await axios.post(ROOT_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function getById(id: string, token: string) {
  /* Injection Warning */
  /* TODO: Fix */
  const res = await axios.get(ROOT_URL + "/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function put(id: string, data: OrderPutData, token: string) {
  /* Injection Warning */
  /* TODO: Fix */
  const res = await axios.put(ROOT_URL + "/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function del(id: string, token: string) {
  /* Injection Warning */
  /* TODO: Fix */
  const res = await axios.delete(ROOT_URL + "/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { status: res.status, statusText: res.statusText };
}
