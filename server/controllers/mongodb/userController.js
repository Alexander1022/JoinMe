import express from "express";
import mongoose from 'mongoose';
import PostUser from "../../models/user.model.js";

const router = express.Router();

export const getUsers = async (req, res) => {
    try
    {
        const postUsers = await PostUser.find();
        res.status(200).json(postUsers);
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    const newUser = new PostUser({ name, middle_name, nickname, email, password, joiners });

    try
    {
        //const { name, middle_name, nickname, email, password_user, age } = req.body;
        await newUser.save();

        res.status(201).json(newUser);
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export default router;