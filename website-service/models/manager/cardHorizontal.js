//建模
const mongoose = require("mongoose")
const cardHorizontal = new mongoose.Schema({
    mainTitle:{type:String},
    subTitle:{type:String},
    cardList:{type:Array},
    createdUser:{type: String},
    createdTime:{type: String}
})
module.exports = mongoose.model('cardHorizontal',cardHorizontal)