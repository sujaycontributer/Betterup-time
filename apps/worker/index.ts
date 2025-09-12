import axios from "axios";
import { xAckBulk, xReadGroup } from "redis_stream/client"
import { prismaClient } from "store/client"

const REGION_ID = "7cffefbb-81cc-4207-bade-fd96371ff3ca"; // || process.env.REGION_ID!;
const WORKER_ID = "worker-1";

if (!REGION_ID || !WORKER_ID) throw new Error("REGION_ID OR WORKER_ID is not there");

async function main() {
  const res: any = await xReadGroup(REGION_ID, WORKER_ID); // in stream shoud have websiteId
  console.log(JSON.stringify(res[0].messages)); 
  const promises = res?.map(({ messages }: any) => messages.map((obj:any) => checkStatus(obj.message.url, obj.message.id) ) ); // promises have array of promises
  if (promises) {
    await Promise.all(promises);
    console.log(promises.length);
  }
  const streamObj = res[0]?.messages;
  const streamIds = streamObj?.map((stremaRes: any) => stremaRes.id);
  console.log(streamIds)

  // acknoledgement *********** very imporant part ************
  if (streamIds) xAckBulk(REGION_ID, streamIds);
}

async function checkStatus(url: string, websiteId: string) {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now();
    axios.get(url)
      .then(async () => {
        // means website is up 
        await prismaClient.websiteTick.create({
          data: {
            response_time: Date.now() - startTime,
            status: "Up",
            timeAdded: new Date(),
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
            status: "Down",
            timeAdded: new Date(),
            region_id: REGION_ID,
            website_id: websiteId
          }
        });
        resolve();

      });
  });
}

main();

