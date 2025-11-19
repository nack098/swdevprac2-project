"use server";

import axios from "axios";

const ROOT_URL = `${process.env.BACKEND || ""}/orders`

export async function get() {
    return await axios.get(ROOT_URL);
}

export async function post(data: OrderCreateData) {
    return await axios.post(ROOT_URL, data);
}

export async function getById(id:string) {
    /* Injection Warning */
    /* TODO: Fix */
    return await axios.get(ROOT_URL + "/" + id);
}

export async function put(id: string, data: OrderPutData) {
    /* Injection Warning */
    /* TODO: Fix */
    return await axios.put(ROOT_URL + "/" + id, data);
}

export async function del(id:string) {
    /* Injection Warning */
    /* TODO: Fix */
    return await axios.delete(ROOT_URL + "/" + id);
}