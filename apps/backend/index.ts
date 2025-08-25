import express from "express";
import websiteRouter from './routes/v1/website';

const app = express();
app.use(express.json());
app.use('/api/v1', websiteRouter);





app.listen(process.env.PORT || 3000), () => {
    console.log("Server in running http://localhost:3000");
};

