import mongoose from "mongoose";

const postUser = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 12
    },
    joiners: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostUser = mongoose.model('PostUser', postUser);

export default PostUser;