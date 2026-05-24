import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db.js";
import User from './models/user.model.js';
import watchHistoryRouter from './routes/watchHistory.route.js';



const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(cookieParser());
app.use('/api/watch-history', watchHistoryRouter);

const PORT = process.env.PORT || 3001;

//get request home page
app.get('/', (req, res) => {
    res.send('');
});


//post request signup
app.post("/api/signup", async (req, res) => {
    const {username, email, password} = req.body;
    try{
        if(!username || !password || !email){
            throw new Error("All fields are required.")
        }
        const emailExist = await User.findOne({email});
        if(emailExist){
            return res.status(400).json({message: "User Already Exists.."})
        }

        const usernameExist = await User.findOne({username});
        if(usernameExist){
            return res.status(400).json({message: "Username is taken, try another name."})
        }

        const hashedPassword = await bcryptjs.hash(password, 8);
        
        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword
        })

        //JSON WEB TOKEN
        if(userDoc){
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
                expiresIn: "7d"
            }) //takes payload, secrets, options

            res.cookie("token", token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",

            })
        }


        return res.status(200).json({ user: userDoc, message: "User created successfully" })
    }

    catch(error){
        res.status(400).json({message: error.message})
    }
});


//get request keep cookie to login
app.get('/api/fetch', async (req, res) =>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({ message: "No token provided."})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Invalid Token"})
        }

        //find all user details except the password.
        const userDoc = await User.findById(decoded.id).select("-password");

        if(!userDoc){
            return res.status(400).json({message: "No user found."});
        }
        res.status(200).json({user: userDoc});
    }
    catch(error){
        console.log("Error fetching user", error.message);
        return res.status(400).json({message: error.message})
    }
});

//post req logout
app.post('/api/logout', async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({message: "Logged out."})
})


app.post("/api/login", async (req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.findOne({username});
        if(!userDoc){
            return res.status(400).json({message: 'Invalid Credentials.'});
        }

        const isPasswordValid = bcryptjs.compareSync(password, userDoc.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid Password"});
        }

        const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        }); //takes payload, secrets, options

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({ user: userDoc, message: "Logged in successfully" });

    }
    catch(error){
        console.log("Error logging in.", error.message)
        res.status(400).json({message: error.message})
    }
})

app.listen(PORT, () => {
    connectToDB();
    console.log(`server is running on port: ${PORT}` );
});