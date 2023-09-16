import mongoose from "mongoose";

const kittySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publish_year: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);
export const Book = mongoose.model('Kitten', kittySchema);