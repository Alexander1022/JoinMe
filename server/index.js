import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postUsers from './routes/postUser.js';
import postEvents from './routes/postEvents.js';
import postFriendships from "./routes/postFriendships.js";
import { Server } from "socket.io";
import giveMeId from "./middleware/tokenToId.js";

const app = express();

const io = new Server({
    cors: {
        origin: "https://localhost:3000",
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

let users = [];

const addUser = (user_id, socket_id) => {
    !users.some((user) => user.user_id === user_id) && users.push({user_id, socket_id});
};

const removeUser = (socket_id) => {
    users = users.filter((user) => user.socket_id !== socket_id);
};

const getUser = (user_id) => {
  return users.find((user) => user.user_id === user_id);
};

io.on("connection", (socket) => {
    console.log("There is a new connection: " + socket.id);

    socket.on("newUser", (jmtoken) => {
        giveMeId(jmtoken).then(function(user_id)
        {
            addUser(user_id, socket.id);
            console.log("New user was added online: " + user_id);
        });
    });

    socket.on("sendNotification", ({senderToken, receiverId }) => {
        giveMeId(senderToken).then(function(s_id)
        {
            const receiver = getUser(receiverId);

            if(receiver != null)
            {
                io.to(receiver.socket_id).emit("getNotification", {
                    s_id,
                });

                console.log("Notification was sent.");
            }
        });
    });

    socket.on("disconnect", () => {
        console.log(socket.id + " was removed.");
       removeUser(socket.id);
    });
});

io.listen(1000);
