import pool from "../../db.js";
import express from "express";
import jwtGenerator from "../../utils/jwtGenerator.js";
const router = express.Router();

export const getUsers = async (req, res) => {
    try
    {
        const my_id = req.user.user.id;

        const users = await pool.query("SELECT * FROM JoinMeUser WHERE user_id != $1 ORDER BY nickname ASC", [my_id]);
        res.status(200).json(users.rows);
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    const { full_name, nickname, email, gender, picture, friendsCount } = req.body;

    try
    {
        const user = await pool.query(
            "SELECT * FROM JoinMeUser WHERE email = $1",
            [email]
        );

        if(user.rows.length > 0)
        {
            await pool.query(
                "UPDATE JoinMeUser SET picture  = $1 WHERE email = $2",
                [picture, email]
            );

            const jmtoken = jwtGenerator(user.rows[0].user_id);
            return res.status(200).json({ jmtoken });
        }

        const newUser = await pool.query(
            "INSERT INTO JoinMeUser (full_name, nickname, email, gender, picture, friendsCount) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [full_name, nickname, email, gender, picture, friendsCount]
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
            "SELECT full_name, nickname, email, gender, picture, friendsCount FROM JoinMeUser WHERE user_id = $1",
            [user_id]
        );

        res.json(user.rows[0]);
    }

    catch(error)
    {
        res.json({message: error.message});
    }
}

export const userProfile = async(req, res) => {
    try
    {
        const user_id = req.params.userId;

        const search = await pool.query(
            "SELECT full_name, nickname, email, gender, picture, friendsCount FROM JoinMeUser WHERE user_id = $1",
            [user_id]
        );

        if(search.rows.length > 0)
        {
            res.json(search.rows[0]);
        }

        else
        {
            res.status(404).json({error: "User id is invalid. Are you sure this id is correct?"});
        }
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

export const changeNickname = async (req, res) => {
    const user_id = req.user.user.id;
    const { nickname } = req.body;

    try
    {
        const changingNickname = await pool.query(
            "UPDATE JoinMeUser SET nickname = $1 WHERE user_id = $2 RETURNING nickname",
            [nickname, user_id]
        );

        if(changingNickname.rows.length)
        {
            res.json({answer: true, data: changingNickname.rows});
        }

        else
        {
            res.json({answer: false});
        }

    }

    catch(error)
    {
        res.json({message: error.message});
    }
}