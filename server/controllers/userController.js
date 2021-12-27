import express from "express";
// import mongoose from 'mongoose';
import pool from "../db.js";
// import PostUser from "../models/user.model.js";

const router = express.Router();

export const getUsers = async (req, res) => {
    try
    {
        /*const postUsers = await PostUser.find();

        res.status(200).json(postUsers);
        */
        const users = await pool.query("SELECT * FROM JoinMeUser");
        res.status(200).json(users.rows);
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    //const newUser = new PostUser({ name, middle_name, nickname, email, password, joiners });

    try
    {
        const { name, middle_name, nickname, email, password_user, age } = req.body;
        /*await newUser.save();

        res.status(201).json(newUser);
        */

        const newUser = await pool.query(
            "INSERT INTO JoinMeUser (name, middle_name, nickname, email, password_user, age, joiners) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, middle_name, nickname, email, password_user, age, 0]
        );

        res.status(201).json(newUser.rows[0]);
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export default router;