import axios from "axios";
import { resolve } from "bun";
import { xAck, xReadGroup } from "redis_stream/client"
import {prismaClient} from "store/client"

const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

if(!REGION_ID || !WORKER_ID) throw new Error("REGION_ID OR WORKER_ID is not there");

async function main() {
    const res: any = await xReadGroup(REGION_ID, WORKER_ID);
    // console.log(res[0].messages);
    const promises = res.map(({id, messages}:any) => checkStatus(messages.url, messages.id)); // array of promises
    
}

async function checkStatus(url: string, websiteId: string) {
  return new Promise<void>((resolve, reject) => {
        //  const url = messages.url;
        //  const websiteId = messages.id;

         const startTime = Date.now();

          axios.get(url)
              .then( async() => {
                // means website is up 
                await prismaClient.websiteTick.create({
                  data: {
                      response_time: Date.now() - startTime,
                      status: "Up",
                      timeAdded: Date.now().toString(),
                      region_id: REGION_ID,
                      website_id: websiteId
                  }
                });
                resolve();
              })
              .catch(async (err) => {
                  // means website is down
                  await prismaClient.websiteTick.create({
                    data: {
                        response_time: Date.now() - startTime,
                        status: "Up",
                        timeAdded: Date.now().toString(),
                        region_id: REGION_ID,
                        website_id: websiteId
                    }
                  });
                  resolve();

              });
          });
}

main();

