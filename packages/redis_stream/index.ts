import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

type websiteType = {id: string, url: string};

async function xAdd({url, id}: websiteType) {
    const res = await client.xAdd(
        'betteruptime:website', '*', {
           id,
           url
        }
    );

}

export async function xAddBulk(websites: websiteType[]) {
    
    for(let i = 0; i < websites.length; i++ ) {
        await xAdd({url: websites[i]?.url!, id: websites[i]?.id!})
    }
}