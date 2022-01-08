import pool from "../../db.js";
import express from "express";

const router = express.Router();

export const getUsers = async (req, res) => {
    try
    {
        const users = await pool.query("SELECT * FROM JoinMeUser");
        res.status(200).json(users.rows);
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    try
    {
        const { full_name, nickname, email, gender, joiners } = req.body;

        const newUser = await pool.query(
            "INSERT INTO JoinMeUser (full_name, nickname, email, gender, joiners) VALUES($1, $2, $3, $4, $5);",
            [full_name, nickname, email, gender, joiners]
        );

        res.status(201).json(newUser.rows[0]);
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export default router;