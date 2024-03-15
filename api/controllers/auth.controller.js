import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendMail.js";
import jwt from "jsonwebtoken";

export async function signup(req,res){
    try {
        const {username,email,password} = req.body;

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"username is already exists"});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        });

        if(newUser){

            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                username : newUser.username,
            })
        }else{
            res.status(400).json({error:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:'Internal Server Error'});
    }
}

export async function login(req,res){
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            username:user.username,
        })
    } catch (error) {
        console.log("Error in signin controller",error.message);
        res.status(500).json({error:'Internal Server Error'});      
    }
}


export async function forgotPassword(req,res){
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"User not found!.."});
        }

        const token = jwt.sign({id:user._id},process.env.KEY,{expiresIn:"90min"});
        sendEmail(email,token);
        res.status(200).json({
           message : "Link send to email successfully"
        })
    } catch (error) {
        console.log("Error in forgot-password controller",error.message);
        res.status(500).json({error:'Internal Server Error'});      
    }
}

export async function resetPassword(req,res){
    try {
        const {password} = req.body;
        const {token} = req.params;
        
        const decode = jwt.verify(token,process.env.KEY);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const user = await User.findByIdAndUpdate(decode.id,{password:hashedPassword});
        res.status(200).json({
          message : `${user.username} password successfullY reset `
        })
    } catch (error) {
        console.log("Error in reset-password controller",error.message);
        res.status(500).json({error:'Internal Server Error'});      
    }
}

export async function logout(req,res){
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error:'Internal Server Error'});
    }
}


