import express from "express";
import { getEventById, getEvents, postEvent } from "../controllers/mongodb/eventsController.js";
const router = express.Router();

router.get('/', getEvents);
router.get('/id/:eventId', getEventById);
router.post('/add', postEvent);

export default router;