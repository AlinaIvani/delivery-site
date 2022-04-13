const Orders = require('./models/Orders')
const {validationResult} = require('express-validator')

class OrderController {
    async addOrders(req,res){
        return res.status(200).json({message: "dsadsads"})
    }
}

module.exports = new OrderController()