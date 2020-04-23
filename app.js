const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const { readAuthor, createAuthor, updateAuthor, deleteAuthor} = require("./src/controllers/authorControllers")
const {createGenre, readGenres} = require("./src/controllers/genreControllers")
const { createBook } = require("./src/controllers/bookControllers")
const {createUser} = require ("./src/controllers/userControllers") 
const { login, auth } = require("./src/controllers/authControllers") 


mongoose.connect(process.env.DB_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("Successfully connected to database")).catch(err => console.log(err))


const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router)


app.get("/", (req, res) => {
    return res.status(200).json({ status: "ok", data: [] })
})


router.route("/authors")
.get(readAuthor)
.post(createAuthor)
  


router.delete("/authors/:id",deleteAuthor)
router.put("/authors/:id", updateAuthor)



router.route("/genres")
.get(readGenres)
.post(createGenre)

router.route("/books")
.post(createBook)

router.route("/users")
.post(auth, createUser)

router.route("/auth/login")
.post(login) 

app.listen(process.env.PORT, () => {
    console.log("App is running on port", process.env.PORT);
});