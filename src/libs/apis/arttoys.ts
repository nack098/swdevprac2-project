"use server";

import axios from "axios";

const ROOT_ROUTE: string = `${(process.env.BACKEND_URL || "")}/arttoys`;

async function get() {
    return await axios.get(ROOT_ROUTE)
}

async function create(data: ArtToysData) {
    return await axios.post(ROOT_ROUTE, data);
}

async function getById(id: string) {
    /* This is unsafe because there is no id validation hence risking of injection */
    /* TODO: Fix */
    return await axios.get(ROOT_ROUTE + "/" + id);
}

async function put(id: string, data: ArtToysData) {
    /* This is unsafe because there is no id validation hence risking of injection */
    /* TODO: Fix */
    return await axios.put(ROOT_ROUTE + "/" + id, data);
}

async function del(id: string) {
    /* This is unsafe because there is no id validation hence risking of injection */
    /* TODO: Fix */
    return await axios.delete(ROOT_ROUTE + "/" + id);
}

export default { get, create, getById, put, del }
   
