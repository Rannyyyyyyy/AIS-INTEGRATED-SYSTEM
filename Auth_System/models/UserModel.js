import pool from '../config/db.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//User creation function
export const createUser = async (userProfile, email, password) =>{

    if(email.trim() === '' || 
        password.trim() === ''){
        const error = new TypeError(
            'Email, and Password are required.'
        )
        error.statusCode = 400;
        throw error;
    }           
    
    //Email validation
    if(!validator.isEmail(email)){
        const error = new TypeError(
            'Invalid email address.'
        )
        error.statusCode = 400;
        throw error;
    }

    //Password strength validation
    if(!validator.isStrongPassword(password)){
        const error = new TypeError(
            'Password is not strong enough.'
        )
        error.statusCode = 400;
        throw error;
    }

    //Check for existing email
    const [user] = await pool.query("SELECT Email FROM tbluser WHERE Email = ?", [email]);

    if(user.length === 1){
        const error = new Error(
            `The email ${email} is already used.`
        )
        error.statusCode = 400;
        throw error;
    }


    //Hash password
    const salt =bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    //Changes
    const response = await fetch(
        `http:localhost:4000/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userProfile)
        });

    const [newUser] = await pool.query(
        "INSERT INTO tbluser(Email, Password) VALUES (?, ?)",
         [email, hashedPassword]
        
        );
        return newUser;

}
    //User Login
 export const loginUser = async (email, password) =>{

        if(email.trim() === '' || password.trim() === ''){
            const error = new Error('Email and Password is required')
            error.statusCode = 400;
            throw error;
        }

        //Check for existing email
        const [user] = await pool.query(
             "SELECT * FROM tbluser WHERE Email = ?", [email]);

        if(user.length === 0){
            const error = new Error(
                `An account with the email: ${email} does not exist.`)
                error.statusCode = 400;
                throw error;
        }
        
        if(!bcrypt.compareSync(password, user[0].Password)){
            const error = new Error('Incorrect passowrd')
            error.statusCode = 400;
            throw error;
        }

        //Generate Token
        const token = jwt.sign(
            {id: user[0].id},
            process.env.SECRET,
            {expiresIn: '1d'});

        return token;
        
}

export const getUser = async (id) =>{
    if(parseInt(id) === NaN ){
        throw new Error('Invalid ID');
    }

    const [user] = await pool.query('SELECT * FROM tbluser WHERE id = ?', [id]);

    return user;
}