import express from "express";
import websiteRouter from './routes/v1/website';
import { prismaClient } from "store/client";

const app = express();
app.use(express.json());
app.use('api/v1', websiteRouter);

app.post('/website', async (req, res) => {
    const {url} = req.body;
    try {
        await prismaClient.website.create({
            data: {
                url
            }
        });

        return res.status(200).json({
            message: "Url crated!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something error while putting url to db"
        })
    }
});

app.get('/status/:websiteId', (req, res) => {
    return res.send("Hi there")
});

app.listen(process.env.PORT || 3000), () => {
    console.log("Server in running http://localhost:3000");
};

