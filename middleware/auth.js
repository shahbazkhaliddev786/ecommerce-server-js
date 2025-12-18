import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const Auth = async(req, res, next)=>{
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(403).json({message:"Please login..."})
        }

        const decoded = jwt.verify(token, process.env.JWT_SEC)
        req.user = { _id: decoded._id };
        next()

    } catch (error) {
        res.status(500).json({message:"Please login"});
    }
}