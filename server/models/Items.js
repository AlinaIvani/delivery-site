const {Schema, model} = require('mongoose')

const Items = new Schema({
    name: {type: String, required:true},
    amount: {type: Number},
    weight: {type: Number, required:true},
    category: {type: String, required: true},
    price: {type: Number, required:true},
    discription: {type: String, required:true}
})

module.exports = model('Items', Items)