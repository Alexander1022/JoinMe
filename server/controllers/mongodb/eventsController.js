import express from "express";
import PostEvent from "../../models/events.model.js";

const router = express.Router();

export const getEvents = async (req, res) => {
    const today = new Date();
    const todaysDate = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);

    try
    {
        if(req.query.filter)
        {   
            const events = await PostEvent.find({title: {'$regex' : req.query.filter, '$options' : 'i'}});
            res.status(200).json(events);
        }

        else
        {
            const events = await PostEvent.find({date: {$gte: todaysDate}}).sort({createdAt:'desc'});
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

export const getEventsInterests = async(req, res) => {
    const events = req.events;
    var tags = [];

    try
    {
        for(var i = 0 ; i < events.length ; i++)
        {
            const event = await PostEvent.find({_id: events[i]}).select('tags');

            let interests = event[0].tags;

            for(let j = 0 ; j < interests.length ; j++)
            {
                tags.push(interests[j]);
            }
        }

        const map = tags.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());


        res.json({interest: Array.from(map.keys()), count: Array.from(map.values())});
    }


    catch (error)
    {
        res.json({message: error.message});
    }
}

export const addFavEvent = async(req, res) => {
    const event_id = req.params.eventId;

    await PostEvent.findOneAndUpdate({_id: event_id}, {$inc: {'interested_count': 1}});

    res.json({message: "This event was added to your favourites!", answer: true});
}

export const removeFavEvent  = async(req, res) => {
    const event_id = req.params.eventId;

    await PostEvent.findOneAndUpdate({_id: event_id}, {$inc: {'interested_count': -1}});

    res.json({message: "This event was removed from your favourites!", answer: true});
}

export const trendingTag = async (req, res) => {
    const event_ids = req.event_ids;
    var tags = [];

    function mode(array)
    {
        if(array.length == 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
            var el = array[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    for(let i = 0 ; i < event_ids.length ; i++)
    {
        const tagsEvent = await PostEvent.find({_id : event_ids[i].event_id.replace(/"/g, ''), createdAt: {$gte: new Date(new Date() - 7 * 60 * 60 * 24* 1000)}}, {sort: {createdAt: -1}}).select('tags');

        if(tagsEvent != "")
        {
            for(let j = 0 ; j < tagsEvent[0].tags.length ; j++)
            {
                for(let t = 0 ; t < event_ids[i].count ; t++)
                {
                    tags.push(tagsEvent[0].tags[j]);
                }
            }
        }
    }

    res.json(mode(tags));
};

export const getEventsAnalytics = async (req, res) => {
    const event_ids = req.event_ids;
    var events = [];

    try
    {
        for(let i = 0 ; i < event_ids.length ; i++)
        {
            const event = await PostEvent.find({_id: event_ids[i].event_id.replace(/"/g, '')}).select('title coverUrl time date');
            events.push(event);
        }

        res.json(events);
    }

    catch (error)
    {
        res.json({message: error.message});
    }
}

export default router;