const mongoose = require("mongoose");
const Genre = require("./genre")


const schema = mongoose.Schema ({
    title:{
        type:String,
        required:[true,"title is required"],
        trim:true
    },
    genres:Array,
    author: Object,
});

schema.pre('save', async function(next){
   this.author = await Author.findById(this.author);
   const genreArray =this.genres.map(async el => await genreArray.findById(el))
   this.genres = await Promise.all(genreArray)
    next()
});


const Book = mongoose.model("Book", schema);
 
module.exports = Book 