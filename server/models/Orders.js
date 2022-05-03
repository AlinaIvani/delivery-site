const {Schema, model} = require('mongoose')

const Orders = new Schema({
    username: {type: String, required:true},
    adress: {type: String, required:true},
    mobileNumber: {type: String, required:true},
    items: {type: Object, required:true},
    totalprice: {type: String, required:true},
})

module.exports = model('Orders', Orders)