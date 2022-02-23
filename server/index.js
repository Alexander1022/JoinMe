import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postUsers from './routes/postUser.js';
import postEvents from './routes/postEvents.js';
import postFriendships from "./routes/postFriendships.js";
import { Server } from "socket.io";

const app = express();

const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    },
});

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/users', postUsers);
app.use('/events', postEvents);
app.use('/friendships', postFriendships);


const CONNECTION_URL = "mongodb+srv://justatest:admin1234@cluster0.ifvrn.mongodb.net/JoinMe?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    console.log("MongoDB is connected.");
});

io.on("connection", (socket) => {
    console.log("New connection");
});

io.listen(1000);
