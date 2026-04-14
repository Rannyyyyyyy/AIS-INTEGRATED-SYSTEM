import express from "express";
import 'dotenv/config.js';
import userRoutes from "./routers/UserRoutes.js";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use('/user', userRoutes);

try {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`listening to port ${process.env.PORT || 4000}...`);
    });
} catch (error) {
    console.log(error);

}