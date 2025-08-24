import Router from 'express';
import {prismaClient} from 'store/client'

const websiteRouter = Router();

websiteRouter.post('/website', (req, res) => {

});

websiteRouter.get('/status/:websiteId', (req, res) => {

});

export default websiteRouter;