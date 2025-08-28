import axios from "axios";
import {describe, it, expect} from "bun:test";
import { BASE_URL } from "./config";

const randomUsername = Math.random().toString();

describe("Signup endpoints test", async () => {
    it("Isnt signup if body is incorrect", async () => {
       try {
         await axios.post(`${BASE_URL}/api/v1/user/signup`, {
            email: "dasda",
            password: "ddkfrennkci"
        });
        expect(false, "Control should not reach here");
       } catch (e) {

       }
    })

    it("Is able to signup if body is correct", async () => {
       
        const res = await axios.post(`${BASE_URL}/api/v1/user/signup`, {
            username: randomUsername,
            password: "ddkfrennkci"
        });
        expect(res.status).toBe(200);
        expect(res.data.id).toBeDefined();
        
    })
})

describe("Signin endpoints test", async () => {
    it("Isnt signin if body is incorrect", async () => {
       try {
         await axios.post(`${BASE_URL}/api/v1/user/signin`, {
            email: "dasda",
            password: "ddkfrennkci"
        });
        expect(false, "Control should not reach here");
       } catch (e) {
        // console.log(e); if here control comes measns succed
        
       }
    })

    it("Is able to signin if body is correct", async () => {
       
        const res = await axios.post(`${BASE_URL}/api/v1/user/signin`, {
            username: randomUsername,
            password: "ddkfrennkci"
        });
        expect(res.status).toBe(200);
        expect(res.data.jwt).toBeDefined();
        
    })
})