const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')




const schema = mongoose.Schema({
    email: { 
    type: String,    
    required: [true, "email is required"],
    trim:true,
    unique: true, 
    lowercase: true, 
    validate: {
        validator: function (v) {
            return validator.isEmail(v);

        }
    }
},
    name: {
        type:String,
        required: [true,"name is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true
        
    },
    tokens: [String]
});


schema.statics.loginWithCredentials = async (email,password)=> {
    const user = await user.findOne({ email: email})
    if(!user) throw new Error("User not found")
    console.log(email,password)
    const allow = await bcrypt.compare(password.toString, user.password)
    if(!allow) throw new Error("Password not correct")

    return user
}

schema.methods.generateToken = async function(){
    const jsonToken = jwt.sign({email: this.email, id: this.id },process.env.SECRET)
    
    this.tokens.push(jsonToken)
    await this.save();
    return jsonToken 
}

schema.methods.toJSON = function() {
console.log(this)
let newObj =  this.toObject()    
delete newObj.password;
delete newObj.__v
return newObj 
}

schema.pre("save", async function(next){
    if(this.isModified("password")){
        const hashPassword = await bcrypt.hash(this.password, saltRounds) 
        this.password = hashPassword
    }
    next()
 });

const User = mongoose.model('User', schema) ;


module.exports = User