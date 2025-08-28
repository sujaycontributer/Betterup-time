import { prismaClient } from "store/client"
import { xAddBulk } from "redis_stream/client";

async function main () {
    let websites = await prismaClient.website.findMany({
        select: {
            url: true,
            id: true
        }
    });

    await xAddBulk(websites);
}

setInterval(() => {
    main();
}, 3 * 60 * 1000);

main();