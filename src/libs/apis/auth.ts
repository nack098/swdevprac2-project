"use server"

import axios from "axios"

const ROOT_URL: string = `${process.env.BACKEND || ""}/auth`

interface RegisterData {
    name: string;
    email: string;
    tel: string;
    password: string;
}

interface LoginData {
    email:string;
    password: string;
}

async function register(data: RegisterData) {
    return await axios.post(ROOT_URL + "/register", {
        ...data,
        role: "member",
        createdAt: (new Date()).toISOString().split("T")[0]
    })
}

async function login(data: LoginData) {
    return await axios.post(ROOT_URL + "/login", data)
}

async function logout() {
    return await axios.get(ROOT_URL + "/logout")
}

async function me() {
    return await axios.get(ROOT_URL + "me")
}

export default { register, login, logout, me }
