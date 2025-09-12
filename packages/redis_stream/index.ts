import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

type websiteType = {id: string, url: string};
const STREAM_NAME = 'betteruptime:website';

async function xAdd({url, id}: websiteType) {
    const res = await client.xAdd(
        STREAM_NAME, '*', {
           id,
           url
        }
    );
    return res;
}

export async function xAddBulk(websites: websiteType[]) {
    console.log(websites.length);
    console.log(websites);
    for(let i = 0; i < websites.length; i++ ) {
        const res = await xAdd({url: websites[i]?.url as string, id: websites[i]?.id as string});
        console.log(res);
    }
    console.log(`Pushed ${websites.length} websites into redis`);
}

export async function xReadGroup(consumerGroup: string, workerId: string): Promise<any> {
    const res = await client.xReadGroup(consumerGroup, workerId, {
        key: STREAM_NAME,
        id: '>'
    }, {
        COUNT: 5
    });
    // console.log(JSON.stringify(res[0].messages));
    return res;
} 

async function xAck(consumerGroup: string, streamId: string) {
    await client.xAck(STREAM_NAME, consumerGroup, streamId);
}

export async function xAckBulk( consumerGroup: string, eventIds: string[] ){
        eventIds.map(eventId => xAck(consumerGroup, eventId));
}