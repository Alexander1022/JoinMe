import express from "express";
import {
    addFavEvent,
    getEventById,
    getEvents,
    getEventsByMe,
    postEvent, removeFavEvent
} from "../controllers/mongodb/eventsController.js";
import {
    postEventPostgre,
    getEventsIdsCreatedByMe,
    getEventCreator, addEventToFav, removeEventFromFav, isInMyFav, getEventIdsCreatedByUser
} from "../controllers/postgresql/eventsController.js";
const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', auth, getEvents);
router.get('/id/:eventId', auth, getEventById);
router.post('/add', auth, postEvent, postEventPostgre);
router.get('/createdByMe', auth, getEventsIdsCreatedByMe, getEventsByMe);

router.get('/createdBy/:userId', auth, getEventIdsCreatedByUser, getEventsByMe);

router.get('/id/:eventId/creator', auth, getEventCreator);

router.post('/id/:eventId/fav', auth, addEventToFav, addFavEvent);
router.delete('/id/:eventId/fav', auth, removeEventFromFav, removeFavEvent);
router.get('/id/:eventId/fav', auth, isInMyFav);

export default router;