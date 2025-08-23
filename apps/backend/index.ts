import express from "express";
import websiteRouter from './routes/v1/website';

const app = express();
app.use('api/v1', websiteRouter);

app.post('/website', (req, res) => {

});

app.get('/status/:websiteId', (req, res) => {

});

app.listen(process.env.PORT || 3000);

