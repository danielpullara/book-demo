const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const Author = require("./src/models/author")

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


router.post('/authors', async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== "string") return res.status(400).json({ status: "fail", error: "invalid input for name" })

    try {
        const author = await Author.create({ name: name })
        return res.status(201).json({ status: "ok", data: author })
    } catch (err) {
        return res.status(500).json({ status:"ok", error: err.message })
    };
});


app.listen(process.env.PORT, () => {
    console.log("App is running on port", process.env.PORT);
});