import Router from 'express';
import { prismaClient } from 'store/client'
import { authInput } from '../../utils/types';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../middleware/authMiddleware';

const websiteRouter = Router();

websiteRouter.post('/user/signup', async (req, res) => {
    const data = authInput.safeParse(req.body);
    if (!data.success) {
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
        res.status(403).json({ error: "User already exists" });
        return;
    }

});

websiteRouter.post('/user/signin', async (req, res) => {
    const data = authInput.safeParse(req.body);
    if (!data.success) {
        res.status(403).json({});
        return;
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        });

        if (user) {
            res.json({
                jwt: jwt.sign({ sub: user.id }, process.env.JWT_SECRET!)
            });
            return;
        } else {
            res.status(401).json({ message: "Username or password is invalid" });
            return
        }
    } catch (e) {
        res.status(500).json({});
        return;
    }

});

websiteRouter.post('/website', authMiddleware, async (req, res) => {
    if (!req.body.url) {
        return res.status(401).json({ message: "Url field is not there" });
    }
    try {
        const website = await prismaClient.website.create({
            data: {
                url: req.body.url,
                cretedAt: new Date(),
                user_id: req.userId!
            }
        });

        return res.status(200).json({
            message: "Url crated!",
            id: website.id
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something error while putting url to db"
        });
    }
});

websiteRouter.get('/user/website', authMiddleware, async (req, res) => {
    const websites = await prismaClient.website.findMany({
        where:{
            user_id: req.userId
        }
    });
    res.status(200).json({
        websites
    });
})

websiteRouter.get('/status/:websiteId', authMiddleware, async (req, res) => {
    const websiteId = req.params.websiteId;
    try {
        const website = await prismaClient.website.findFirst({
            where: {
                user_id: req.userId!,
                id: websiteId
            },
            include:{
                ticks: {
                    orderBy: {
                        timeAdded: 'desc'
                    },
                    take: 10,
                }
            }
        });

        if(!website) return res.status(409).json({message: "Not found the website"});
        return res.status(200).json({website});
    } catch (e) {
        return res.status(500);
    }

});

export default websiteRouter;
