import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { tokenSecret } from "../config";

interface IPayload {
    rol: string;
    iat: number;
    exp: number;
}

export const TokenValidationUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies;

    if (!token) return res.status(401).json('Access Denied');

    const payload = jwt.verify(token, tokenSecret) as IPayload;
    req.rol = payload.rol;

    return next();
};

interface IPayloadD {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidationDoctor = (req: Request,res: Response,next: NextFunction) => {
    const token = req.header('Auth-Token');

    if(!token) return res.status(401).json('Access Denied');

    const peload = jwt.verify(token,tokenSecret) as IPayloadD;
    req.rol = peload._id;
    
    return next();
};