import axios from "axios";
import {describe, it, expect, beforeAll} from "bun:test";
import { BASE_URL } from "./config";
import { createUser } from "./utils";

describe("Website test", async () => {
    let id, token;
    beforeAll(async () => {
        const res = await createUser();
        id = res.id;
        token = res.jwt;
    }); 

    it("Wesbite should not be create if url is not there", async () => {
        try {
            await axios.post(`${BASE_URL}/api/v1/website`, {

            }, {
                headers: {
                    Authorization: token!
                }
            });
            expect(false, "Control should not reach here");
        } catch (e) {

        }
    });

    it("Wesbite should  be create if url is exist", async () => {
        try {
            const res = axios.post(`${BASE_URL}/api/v1/website`, {
                url: "https://facebook.com"
            }, {        
                headers: {
                    Authorization: token!
                }
            }); 
            expect((await res).status).toBe(200);
        } catch (e) {

        }
    })
})