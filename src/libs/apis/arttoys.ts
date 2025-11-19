"use server";

import axios from "axios";

const ROOT_ROUTE: string = `${process.env.BACKEND_URL}/arttoys`;

export async function get() {
  const res = await axios.get(ROOT_ROUTE);

  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function create(data: ArtToysData, token: string) {
  const res = await axios.post(ROOT_ROUTE, data, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function getById(id: string) {
  /* This is unsafe because there is no id validation hence risking of injection */
  /* TODO: Fix */
  const res = await axios.get(ROOT_ROUTE + "/" + id);

  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function put(id: string, data: ArtToysData, token: string) {
  /* This is unsafe because there is no id validation hence risking of injection */
  /* TODO: Fix */
  const res = await axios.put(ROOT_ROUTE + "/" + id, data, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function del(id: string, token: string) {
  /* This is unsafe because there is no id validation hence risking of injection */
  /* TODO: Fix */
  const res = await axios.delete(ROOT_ROUTE + "/" + id, {
    headers: {
            "Authorization": `Bearer ${token}`,
        },
  });

  return { status: res.status, statusText: res.statusText };
}

