const Book = require("../models/books");
const Genre = require("../models/genre");
const Author = require("../models/author");
 
exports.createBook = async function (req, res) {
    const { title, genres, author } = req.body;


    const book = await Book.create({
        title: title,
        genres: genres,
        author: author
    })
    await book.save()
    return res.json({ status: "ok", data: book })
} 