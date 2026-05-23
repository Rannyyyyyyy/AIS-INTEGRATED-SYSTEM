import * as Usercontroller from '../controllers/UserController.js'
import express from 'express'

const userRoutes = express.Router();

userRoutes.post('/register', Usercontroller.RegisterUser);
userRoutes.post('/login', Usercontroller.LoginUser);

export default userRoutes;