const bookModel = require('../models/bookModel');

const getAllBooks = async (req, res, next) => {
    try {
        let data = await bookModel.find()
        res.status(201).json({ count: data.length, data })
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getBookById = async (req, res, next) => {
    const { id } = req.params
    try {
        let data = await bookModel.findById(id)
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ message: 'Not Found' });
        }
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const saveNewBook = async (req, res, next) => {
    let body = req.body;
    try {
        if (!body.title || !body.author || !body.publishYear) {
            return res.status(400).json({ message: "Send all required fields: title, author, publishYear" });
        }

        const newBook = { title: body.title, author: body.author, publishYear: body.publishYear };
        let createdBook = await bookModel.create(newBook);

        res.status(201).json({ message: "Book created successfully", book: createdBook });
    } catch (err) {
        console.error("Error creating book:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateBook = async (req, res) => {
    let body = req.body;
    const { id } = req.params
    try {
        let data = await bookModel.findByIdAndUpdate(
            { _id: id },
            { title: body.title, author: body.author, publishYear: body.publishYear },
            { new: true });
        res.status(200).json({ message: "Book updated successfully", data })
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        let data = await bookModel.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Book deleted successfully'", data });
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getAllBooks, saveNewBook, getBookById, updateBook, deleteBook }