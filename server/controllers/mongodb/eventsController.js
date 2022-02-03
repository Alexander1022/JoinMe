import express from "express";
import PostEvent from "../../models/events.model.js";

const router = express.Router();

export const getEvents = async (req, res) => {
    try
    {
        const events = await PostEvent.find();
        res.status(200).json(events);
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const postEvent = async (req, res) => {
    const {title, description, date, time, coverUrl, place} = req.body;

    const newEvent = new PostEvent({ title, description, date, time, coverUrl, place });
    
    try
    {
        await newEvent.save();

        res.status(201).json(newEvent);
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export default router;