"use server";

import axios from "axios";

const ROOT_URL = `${process.env.BACKEND || ""}/orders`

async function get() {
    return await axios.get(ROOT_URL);
}

async function post(data: OrderCreateData) {
    return await axios.post(ROOT_URL, data);
}

async function getById(id:string) {
    /* Injection Warning */
    /* TODO: Fix */
    return await axios.get(ROOT_URL + "/" + id);
}

async function put(id: string, data: OrderPutData) {
    /* Injection Warning */
    /* TODO: Fix */
    return await axios.put(ROOT_URL + "/" + id, data);
}

async function del(id:string) {
    /* Injection Warning */
    /* TODO: Fix */
    return await axios.delete(ROOT_URL + "/" + id);
}

export default { get, post, getById, put, del }
