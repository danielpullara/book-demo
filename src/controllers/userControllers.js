const User = require("../models/user");


exports.createUser = async function (req, res) {
    const { name, email, password } = req.body;
    

    try {
        const user = await User.create({ name, email, password: hashedpassowrd });
        return res.status(201).json({ status: 'ok', data: user })
    } catch (err) {
        return res.status(400).json({ status: "fail", error: err.message })

    }

}