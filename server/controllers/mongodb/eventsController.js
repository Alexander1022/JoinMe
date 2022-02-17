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

export const postEvent = async (req, res, next) => {
    const {title, description, date, time, coverUrl, place, tags} = req.body;
    const user_id = req.user.user.id;
    const newEvent = new PostEvent({ title, description, date, time, coverUrl, place, tags });
    
    try
    {
        await newEvent.save();

        req.id = newEvent._id;
        req.place = newEvent.place[0].lat + ", " + newEvent.place[0].lon;
        req.user_id = user_id;

        next();
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export const getEventsByMe = async (req, res) => {
    const events = req.events;
    var myEvents = [];

    try
    {
        for(var i = 0 ; i < events.length ; i++)
        {
            const event = await PostEvent.find({_id : events[i]}).select('_id title');

            myEvents.push(event);
        }

        res.json(myEvents);
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export default router;