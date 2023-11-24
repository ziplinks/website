//建模
const mongoose = require("mongoose")
const banner = new mongoose.Schema({
    mainTitle:{type:String},
    subTitle:{type:String},
    banner:{type:String},
    createdUser:{type: String},
    createdTime:{type: String}
})
module.exports = mongoose.model('banner',banner)