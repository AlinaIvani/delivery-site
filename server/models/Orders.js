const {Schema, model} = require('mongoose')

const Orders = new Schema({
    name: {type: String, required:true},
})

module.exports = model('Orders', Orders)