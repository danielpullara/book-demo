const User = require("../models/user")


exports.login = async function (req, res) {
    const { email, password } = req.body;


    const user = await User.loginWithCredentials(email, password)
    
    
    const token = user.generateToken()



    try {
        const token = "special"
        return res.status(200).json({ status: "ok", data: token })
    } catch (err) {
        return res.status(400).json({ status: "fail", error: err.message })
    }
}

exports.auth = async function (req,res,next){
    return res.status(401).json({status:"fail"});
    next()
}