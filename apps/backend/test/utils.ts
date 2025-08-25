import axios from "axios";
import { BASE_URL } from "./config";

const userName = Math.random().toString();

export async function createUser(): Promise<{
    id: string;
    jwt: string;
}> {
    const signup = await axios.post(`${BASE_URL}/api/v1/user/signup`, {
        username: userName,
        password: "password"
    });

    const signinRes = await axios.post(`${BASE_URL}/api/v1/user/signin`, {
        username: userName,
        password: "password"
    });
    return {
        id: signinRes.data.id as string,
        jwt: signinRes.data.jwt
    }
}