import mongoose from "mongoose";

const PostEvent = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    coverUrl: {
        type:String,
        required: false
    },
    attending_count: {
        type: Number,
        required: true,
        default: 0
    },
    interested_count: {
        type: Number,
        required: true,
        default: 0
    },
    place: [
        {
           lat: {
               type: String,
               required: true
           },
           lon: {
               type: String,
               required: true
           }
        },
    ],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const postEvent = mongoose.model('PostEvent', PostEvent);

export default postEvent;