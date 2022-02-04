import express from "express";
import PostEvent from "../../models/events.model.js";

const router = express.Router();

export const getEvents = async (req, res) => {
    try
    {
        if(req.query.filter)
        {   
            const events = await PostEvent.find({title: {'$regex' : req.query.filter, '$options' : 'i'}});
            res.status(200).json(events);
        }

        else
        {
            const events = await PostEvent.find();
            res.status(200).json(events);
        }
    }

    catch (error)
    {
        res.status(404).json({message: error.message});
    }
}

export const getEventById = async (req, res) => {
    const eventId = req.params.eventId;

    try
    {
        const event = await PostEvent.find({_id : eventId});

        res.json(event);
    }

    catch(error)
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