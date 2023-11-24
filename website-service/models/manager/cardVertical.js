//建模
const mongoose = require("mongoose")
const cardVertical = new mongoose.Schema({
    cardList:{type:Array},
    createdUser:{type: String},
    createdTime:{type: String}
})
module.exports = mongoose.model('cardVertical',cardVertical)