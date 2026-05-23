import express from "express";
import 'dotenv/config.js';

import authRoutes from "./routes/authRoute.js";


const app = express();

app.use(express.json());

app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
})

try{
    app.listen(process.env.port || 5000, () =>{
        console.log(`Listening to port ${process.env.port || 5000}....`);
    });
}catch(e){
    console.log(e);
}

app.use("/auth", authRoutes);