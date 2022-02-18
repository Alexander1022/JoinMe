import pool from "../../db.js";
import express from "express";
const router = express.Router();

export const createFriendship = async(req, res) => {
    const my_id = req.user.user.id;
    const friend_id = req.params.userId;


    if(my_id == friend_id)
    {
        res.json({message: "You can't add yourself as a friend!"});
    }

    else
    {
        try
        {
            const friendship = await pool.query(
                "SELECT * FROM Friends WHERE user_id = $1 AND friend_id = $2",
                [my_id, friend_id]
            );

            if (friendship.rows.length > 0)
            {
                const friend = await pool.query("SELECT nickname FROM JoinMeUser WHERE user_id = $1", [friend_id]);

                res.json({message: "You are already friends with " + friend.rows[0].nickname + "!"});
            }

            else
            {
                await pool.query(
                    "INSERT INTO Friends (user_id, friend_id) VALUES($1, $2)",
                    [my_id, friend_id]
                );

                await pool.query(
                    "INSERT INTO Friends (friend_id, user_id) VALUES($1, $2)",
                    [my_id, friend_id]
                );

                await pool.query(
                    "UPDATE JoinMeUser SET friendscount = friendscount + 1 WHERE user_id = $1",
                    [my_id]
                );

                await pool.query(
                    "UPDATE JoinMeUser SET friendscount = friendscount + 1 WHERE user_id = $1",
                    [friend_id]
                );

                const friend = await pool.query("SELECT nickname FROM JoinMeUser WHERE user_id = $1", [friend_id]);
                res.json({message: "You are friends with " + friend.rows[0].nickname + "! Join some events together!", answer: true});
            }
        }

        catch (error)
        {
            res.status(404).json({message: error.message, answer: false});
        }

    }
}

export const checkFriendship = async(req, res) => {
    const my_id = req.user.user.id;
    const friend_id = req.params.userId;

    if(my_id == friend_id)
    {
        res.json({message: "You can't be friend with yourself!"});
    }

    else
    {
        try
        {
            const friendship = await pool.query(
                "SELECT * FROM Friends WHERE user_id = $1 AND friend_id = $2",
                [my_id, friend_id]
            );

            if (friendship.rows.length > 0)
            {
                res.json(true);
            }

            else
            {
                res.json(false);
            }
        }

        catch (error)
        {
            res.status(404).json({message: error.message});
        }
    }
}

export const friendsCounter = async(req, res) => {
    const friend_id = req.params.userId;

    try
    {
        const user = await pool.query(
            "SELECT friendsCount FROM JoinMeUser WHERE user_id = $1",
            [friend_id]
        );

        if(user.rows.length > 0)
        {
            res.json({friends: user.rows[0].friendscount});
        }

        else
        {
            res.status(404).json("User not found!");
        }
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const myFriends = async(req, res) => {
    const my_id = req.user.user.id;
    var friends_ids = [];

    try
    {
        const ids = await pool.query(
            "SELECT friend_id FROM Friends WHERE user_id = $1",
            [my_id]
        );

        if(ids.rows.length > 0)
        {
            for(var i = 0 ; i < ids.rows.length ; i++)
            {
                const friend = await pool.query(
                    "SELECT nickname, user_id FROM JoinMeUser WHERE user_id = $1",
                    [ids.rows[i].friend_id]
                );

                const data = {nickname: friend.rows[0].nickname, id: friend.rows[0].user_id};

                friends_ids.push(data)
            }
        }

        res.json(friends_ids);
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const removeFriendship = async(req, res) => {
    const my_id = req.user.user.id;
    const friend_id = req.params.userId;

    try
    {
        const friendship = await pool.query(
            "SELECT * FROM Friends WHERE user_id = $1 AND friend_id = $2",
            [my_id, friend_id]
        );

        if(friendship.rows.length > 0)
        {
            await pool.query(
                "DELETE FROM Friends WHERE user_id = $1 AND friend_id = $2",
                [my_id, friend_id]
            );

            await pool.query(
                "DELETE FROM Friends WHERE user_id = $1 AND friend_id = $2",
                [friend_id, my_id]
            );

            await pool.query(
                "UPDATE JoinMeUser SET friendscount = friendscount - 1 WHERE user_id = $1",
                [my_id]
            );

            await pool.query(
                "UPDATE JoinMeUser SET friendscount = friendscount - 1 WHERE user_id = $1",
                [friend_id]
            );

            res.json({message: "You removed user as a friends!", answer: true});
        }

        else
        {
            res.json({message: "You are not friends!", answer: false});
        }
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}