import jwt from "jsonwebtoken";
import * as UserModel from "../models/UserModel.js"

export const authHandler = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({succes: false, message: "You do not have permission to access the app"});
    }
    const token = authorization.split(" ")[1];

    try{
        const {id} = jwt.verify(token, process.env.SECRET);
        const [user] = await UserModel.getUser(id);
        // req.user = user.id
        next();

    }catch(err){
        res.status(401).json({succes: false, message: "Request is Unauthorized"});
    }
}

export default authHandler;