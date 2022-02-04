import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postUsers from './routes/postUser.js';
import postEvents from './routes/postEvents.js';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/users', postUsers);
app.use('/events', postEvents);

const CONNECTION_URL = "mongodb+srv://justatest:admin1234@cluster0.ifvrn.mongodb.net/JoinMe?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
