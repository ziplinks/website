//建模
const mongoose = require("mongoose")
const footer = new mongoose.Schema({
    tel:{type:String},
    email:{type:String},
    cardList:{type:Array},
    createdUser:{type: String},
    createdTime:{type: String}
})
module.exports = mongoose.model('footer',footer)