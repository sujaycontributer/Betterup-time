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
                url: "https://google.com"
            }, {        
                headers: {
                    Authorization: token!
                }
            }); 
            expect((await res).status).toBe(200);
        } catch (e) {

        }
    })

    it("Can website fetch", async () => {
        let token1, token2, userId1:string, userId2;
        beforeAll(async () => {
            const user1 = await createUser();
            const user2 = await createUser();
            userId1 = user1.id;
            token1 = user1.jwt;
            userId2 = user2.id;
            token2 = user2.jwt;
        });

        it("Is able to fetch the website if website is created", async () => {
                const res = await axios.post(`${BASE_URL}/api/v1/website`, {
                    url: "https://google.com"
                }, {        
                    headers: {
                        Authorization: token1!
                    }
                }); 

                const websiteId = res.data.id;
                
                const fetchWebsite = await axios.get(`${BASE_URL}/api/v1/statua/${websiteId}`, {
                    headers: {
                        Authorization: token1!
                    }
                });
                expect(res.data.id).toBe(fetchWebsite.data.id);
                expect(fetchWebsite.data.user_id).toBe(userId1);

            
        });
    });
});