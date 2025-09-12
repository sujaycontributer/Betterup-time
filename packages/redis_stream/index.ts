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
}

export async function xAddBulk(websites: websiteType[]) {
    console.log(websites.length);
    for(let i = 0; i < websites.length; i++ ) {
        await xAdd({url: websites[i]?.url!, id: websites[i]?.id!})
    }
    console.log("Pushed in to redis");
}

export async function xReadGroup(consumerGroup: string, workerId: string): Promise<any> {
    const res = await client.xReadGroup(consumerGroup, workerId, {
        key: STREAM_NAME,
        id: '>'
    }, {
        COUNT: 5
    });
    // console.log(JSON.stringify(res));
    return res;
} 

async function xAck(consumerGroup: string, streamId: string) {
    await client.xAck(STREAM_NAME, consumerGroup, streamId);
}

export async function xAckBulk( consumerGroup: string, eventIds: string[] ){
        eventIds.map(eventId => xAck(consumerGroup, eventId));
}