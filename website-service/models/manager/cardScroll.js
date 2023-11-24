//建模
const mongoose = require("mongoose")
const cardScroll = new mongoose.Schema({
    mainTitle:{type:String},
    cardList:{type:Array},
    createdUser:{type: String},
    createdTime:{type: String}
})
module.exports = mongoose.model('cardScroll',cardScroll)