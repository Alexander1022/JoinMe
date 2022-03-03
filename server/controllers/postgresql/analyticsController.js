import pool from "../../db.js";
import express from "express";

export const analyticsFriends = async (req, res) => {
    const user_id = req.user.user.id;
    var users = [];
    try
    {
        const info = await pool.query(
            " SELECT F.user_id, COUNT(F.user_id) FROM Friends AS F WHERE (user_id != $1 AND friend_id != $1) AND user_id IN(SELECT friend_id FROM Friends WHERE user_id != $1 AND friend_id != $1 AND friend_id NOT IN (SELECT friend_id FROM Friends WHERE user_id = $1)) GROUP BY F.user_id ORDER BY COUNT(F.user_id) DESC;",
            [user_id]
        );

        for(let i = 0 ; i < info.rows.length ; i++)
        {
            const user = await pool.query("SELECT user_id, picture, full_name, gender, friendscount FROM JoinMeUser WHERE user_id = $1", [info.rows[i].user_id]);
            users.push(user.rows);
        }

        res.json(users);
    }

    catch(error)
    {
        res.json({message: error.message});
    }
};

export const favsEvents = async (req, res, next) => {
    try
    {
        const event_ids = await pool.query("SELECT event_id, COUNT(event_id) FROM MyFav GROUP BY event_id ORDER BY COUNT(event_id) DESC LIMIT 5");


        req.event_ids = event_ids.rows;

        next();
    }

    catch(error)
    {
        res.json({message: error.message});
    }
};

export const analyticsEvents = async (req, res, next) => {
    const user_id = req.user.user.id;

    try
    {
        const event_ids = await pool.query(
            "SELECT DISTINCT event_id FROM MyFav WHERE user_id != $1 AND user_id IN(SELECT friend_id FROM Friends WHERE user_id = $1) AND event_id IN(SELECT event_id FROM UserEvents WHERE user_id != $1) AND event_id NOT IN(SELECT event_id FROM MyFav WHERE user_id = $1) UNION DISTINCT SELECT event_id FROM UserEvents WHERE user_id != $1 AND user_id IN (SELECT friend_id FROM Friends WHERE user_id = $1) AND event_id NOT IN(SELECT event_id FROM MyFav WHERE user_id = $1)",
            [user_id]
        );

        req.event_ids = event_ids.rows;
        next();
    }

    catch(error)
    {
        res.json({message: error.message});
    }
}