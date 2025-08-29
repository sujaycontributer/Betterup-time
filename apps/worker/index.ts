import { xAck, xReadGroup } from "redis_stream/client"

const REGION_ID = process.env.REGION_ID!;
const WORKER_ID = process.env.WORKER_ID!;

if(!REGION_ID || !WORKER_ID) throw new Error("REGION_ID OR WORKER_ID is not there");

async function main() {

    
        const res: any = await xReadGroup(REGION_ID, WORKER_ID);
        console.log(res[0].messages);
    // }
}

main();

