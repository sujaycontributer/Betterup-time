import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function authMiddleware (req:Request,res:Response, next:NextFunction) {
    const header = req.headers.authorization!;
    try {
        const data = jwt.verify(header, process.env.JWT_SECRET!);
        req.userId = data.sub as string;
        next();
    } catch (e) {
        res.status(403).json({message: "Not authorized"});
        return;
    }
}       