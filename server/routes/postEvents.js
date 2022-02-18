import express from "express";
import {getEventById, getEvents, getEventsByMe, postEvent} from "../controllers/mongodb/eventsController.js";
import {
    postEventPostgre,
    getEventsIdsCreatedByMe,
    getEventCreator
} from "../controllers/postgresql/eventsController.js";
const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', auth, getEvents);
router.get('/id/:eventId', auth, getEventById);
router.post('/add', auth, postEvent, postEventPostgre);
router.get('/createdByMe', auth, getEventsIdsCreatedByMe, getEventsByMe);
router.get('/id/:eventId/creator', auth, getEventCreator);

export default router;