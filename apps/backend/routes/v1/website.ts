import Router from 'express';
import {prismaClient} from 'store/client'
import { authInput } from '../../utils/types';
import jwt from 'jsonwebtoken';

const websiteRouter = Router();

websiteRouter.post('/user/signup', async (req, res) => {
    const data = authInput.safeParse(req.body);
    if(!data.success) {
        res.status(403).json({
            message: "Order not valid"
        });
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                username: req.body.username,
                password: req.body.password
            }
        });
        res.status(200).json({
            id: user.id
        });
        return;

    } catch (e) {
        console.log(e);
        res.status(403).json({error: "User already exists"});
        return;
    }
    
});

websiteRouter.post('/user/signin', async (req, res) => {
    const data = authInput.safeParse(req.body);
    if(!data.success) {
        res.status(403).json({});
        return;
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username:req.body.username,
                password: req.body.password
            }
        });

        if(user) {
            res.json({
                jwt: jwt.sign({sub: user.id}, process.env.JWT_SECRET!) 
            });
            return;
        } else{
            res.status(401).json({message: "Username or password is invalid"});
            return
        }
    } catch (e) {
        res.status(500).json({});
        return;
    }
    
});

websiteRouter.post('/website', async (req, res) => {
    const {url} = req.body;
    if(!url) {
        return res.status(401).json({});
    }

    // try {
    //     const website = await prismaClient.website.create({
    //         data: {
    //             url,
    //             cretedAt: new Date()
    //         }
    //     });

    //     return res.status(200).json({
    //         message: "Url crated!",
    //         id: website.id
    //     });
    // } catch (error) {
    //     return res.status(500).json({
    //         message: "Something error while putting url to db"
    //     });
    // }


});

websiteRouter.get('/status/:websiteId', (req, res) => {
    const data = authInput.safeParse(req.body.data);
    if(!data.success) {
        res.status(403).json({});
        return;
    }
    
});

export default websiteRouter;