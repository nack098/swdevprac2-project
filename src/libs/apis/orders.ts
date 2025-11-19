"use server";

import axios from "axios";

const ROOT_URL = `${process.env.BACKEND_URL}/orders`

export async function get() {
    const res = await axios.get(ROOT_URL);
    return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function post(data: OrderCreateData) {
    const res = await axios.post(ROOT_URL, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function getById(id:string) {
    /* Injection Warning */
    /* TODO: Fix */
    const res = await axios.get(ROOT_URL + "/" + id);
    return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function put(id: string, data: OrderPutData) {
    /* Injection Warning */
    /* TODO: Fix */
    const res = await axios.put(ROOT_URL + "/" + id, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return { data: res.data, status: res.status, statusText: res.statusText };
}

export async function del(id:string) {
    /* Injection Warning */
    /* TODO: Fix */
    const res = await axios.delete(ROOT_URL + "/" + id);

    return { status: res.status, statusText: res.statusText };
}