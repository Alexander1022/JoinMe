import pool from "../../db.js";
import express from "express";

export const postEventPostgre = async(req, res) => {
    const user_id = req.user_id;
    const place = req.place;
    const event_mongo = req.id;

    try
    {
        const newPlace = await pool.query(
            "INSERT INTO Place (name) VALUES($1) RETURNING *",
            [place]
        );

        const place_id = newPlace.rows[0].place_id;

        const newEvent = await pool.query(
            "INSERT INTO UserEvents (user_id, place_id, event_id) VALUES($1, $2, $3) RETURNING *",
            [user_id, place_id, event_mongo]
        );

        res.json(newEvent.rows[0]);
    }

    catch(error)
    {
        res.json({message: error.message});
    }
}

export const getEventsIdsCreatedByMe = async(req, res, next) => {
    const user_id = req.user.user.id;

    const eventsByMe = await pool.query(
        "SELECT * FROM UserEvents WHERE user_id = $1",
        [user_id]
    );

    var events = [];

    for(var i = 0 ; i < eventsByMe.rows.length ; i++)
    {
        var event_id = (eventsByMe.rows[i].event_id).replaceAll('"', '');
        events.push(event_id);
    }

    req.events = events;

    next();
}