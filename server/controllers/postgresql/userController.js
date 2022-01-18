import pool from "../../db.js";
import express from "express";
import jwtGenerator from "../../utils/jwtGenerator.js";
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
    const { full_name, nickname, email, gender, friendsCount } = req.body;

    try
    {
        const user = await pool.query(
            "SELECT * FROM JoinMeUser WHERE email = $1",
            [email]
        );

        if(user.rows.length > 0)
        { 
            const jmtoken = jwtGenerator(user.rows[0].user_id);
            return res.status(200).json({ jmtoken });
        }

        const newUser = await pool.query(
            "INSERT INTO JoinMeUser (full_name, nickname, email, gender, friendsCount) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [full_name, nickname, email, gender, friendsCount]
        );

        const jmtoken = jwtGenerator(newUser.rows[0].user_id);
        return res.status(201).json({ jmtoken });
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export const myProfile = async(req, res) =>{
    try
    {
        const user_id = req.user.user.id;

        const user = await pool.query(
            "SELECT full_name, nickname, email, gender, friendsCount FROM JoinMeUser WHERE user_id = $1",
            [user_id]
        );

        res.json(user.rows[0]);
    }

    catch(error)
    {
        res.json({message: error.message});
    }
} 

export const verify = async (req, res) => {
    try
    {
        res.json(true);
    }

    catch(error)
    {
        res.json({message: error.message});
    }
}
export default router;