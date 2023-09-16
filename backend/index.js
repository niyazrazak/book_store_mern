import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from "cors";

const app = express();

app.use(express.json())

// app.use(cors()); // default *
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.get('/', (request, response) => {
    return response.status(234).send("Welcome To Book Store Backend")
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then((r) => {
        console.log("App Connected");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })