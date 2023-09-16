import express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router()

//create book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publish_year
        ) {
            response.status(400).send({ message: `Sent all the required fields` })
        }
        else {
            const newBook = {
                title: request.body.title,
                author: request.body.author,
                publish_year: request.body.publish_year
            }
            const book = await Book.create(newBook);
            response.status(201).send(book);
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        response.status(200).json({
            count: books.length,
            books: books
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})


//book by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        response.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//update
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publish_year
        ) {
            response.status(400).send({ message: `Sent all the required fields` })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            response.status(404).send({ message: `Book Not Found` })
        }
        response.status(200).send({ message: `Book Updated` })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id, request.body);
        if (!result) {
            response.status(404).send({ message: `Book Not Found` })
        }
        response.status(200).send({ message: `Book Deleted` })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

export default router;