import axios from "axios";
import { xAckBulk, xReadGroup } from "redis_stream/client"
import { prismaClient } from "store/client"

const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

if (!REGION_ID || !WORKER_ID) throw new Error("REGION_ID OR WORKER_ID is not there");

async function main() {
  const res: any = await xReadGroup(REGION_ID, WORKER_ID); // in stream shoud have websiteId 
  const promises = res?.map(({ messages }: any) => messages.map((obj:any) => checkStatus(obj.message.url, obj.message.id) ) ); // promises have array of promises
  if (promises) {
    await Promise.all(promises);
    console.log(promises.length);
  }
  const streamIds = res?.map(({ id }: any) => id);

  // acknoledgement *********** very imporant part ************
  if (streamIds) xAckBulk(REGION_ID, streamIds);
}

async function checkStatus(url: string, websiteId: string) {
  return new Promise<void>((resolve, reject) => {
    //  const url = messages.url; const websiteId = messages.id;
    const startTime = Date.now();
    axios.get(url)
      .then(async () => {
        // means website is up 
        await prismaClient.websiteTick.create({
          data: {
            response_time: Date.now() - startTime,
            status: "Up",
            timeAdded: Date.now().toString(),
            region_id: "e9ad0039-df9c-4880-8ca9-92ac429c2782",
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

