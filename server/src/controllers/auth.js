import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()
import { UserModel } from "../models/Users.js";

export const register = async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username})
    if(user){
        return res.json({message : "User already exists!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({username, password : hashedPassword});
    await newUser.save()
    res.json({message : "User Registered Successfully"})
}

export const login = async(req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username})

    if(!user){
        return res.json({message : "User Doesn't Exists!"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({message : "Username or Password is Incorrect!"})
    }

    const token = jwt.sign({id : user._id}, process.env.SECRET_KEY)

    res.json({token, userID : user._id})
}