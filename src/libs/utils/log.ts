"use server";

export default async function log(functionName: string = "unknown",message: string = "") {
    console.log(`[ ${(new Date()).toISOString().split("T")[0]} | ${functionName} ] - ${message}`);
}
