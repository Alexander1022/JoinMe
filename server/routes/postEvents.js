import express from "express";
import { getEvents, postEvent } from "../controllers/mongodb/eventsController.js";
const router = express.Router();

router.get('/', getEvents);
router.post('/add', postEvent);

export default router;