const Orders = require('./models/Orders')
const {validationResult} = require('express-validator')

class OrderController {
    async addOrders(req,res){
        try{
            const {username, mobileNumber, adress, items, totalprice} = req.body
            const order = new Orders({username: username, mobileNumber: mobileNumber, adress: adress, items: items, totalprice: totalprice })
            await order.save()
            return res.status(200).json({message: "Успешно"})
        }
        catch(e){
            return res.status(400).json({message: "Ошибка"})
        }
    }
    async getOrders(req,res){
        try{
            const allOrders = await Orders.find()
            return res.status(200).json(allOrders)
        }catch(e){
            return res.status(400).json({message: "Ошибка"})
        }
    }
}

module.exports = new OrderController()