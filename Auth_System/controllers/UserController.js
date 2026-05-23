import * as UserModel from "../models/UserModel.js";


export const RegisterUser = async (req, res) =>{
    const {firstName, lastName, dob, address, course, major, status, email, password} = req.body;
    try{
        const userProfile = {firstName, lastName, dob, address, course, major, status}
        const userId = await UserModel.createUser(userProfile, email, password);
        res.status(201).json({success: true, message: userId});
    }catch(e){
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export const LoginUser = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const token = await UserModel.loginUser(email, password);
        res.status(201).json({success: true, message: token});
    }catch(e){
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}