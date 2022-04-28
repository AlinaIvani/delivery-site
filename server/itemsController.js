const Items = require('./models/Items')
const {validationResult} = require('express-validator')

class ItemsController {
    async addItems(req, res){
        try {
            const {name, amount, weight, category, price, discription} = req.body
            const valerror = validationResult(req)
            if(!valerror.isEmpty()){
                return res.status(400).json({message: "Название не может быть пустым"})
            }
            const item = new Items({name, amount, weight, category, price,discription})
            await item.save()
            return res.status(200).json({message:"Успешно"})
        } catch (error) {
            return res.status(400).json({message:"Ошибка добавления"}, error)
        }
    }
    async delItems(req, res){
        try {
            const {name} = req.body
            const findItem = await Items.findOne({name})
            if(!findItem){
                return res.status(404).json({message:"Такой продукт не найден"})
            }
            const delItem = await Items.findOneAndDelete({name})
            return res.status(200).json({message:"Успешно"})
        } catch (error) {
            return res.status(400).json({message:"Ошибка удаления"}, error)
        }
    }
    async getItems(req,res){
        try {
            const allItems = await Items.find()
            return res.status(200).json(allItems)
        } catch (error) {
            return res.status(400).json({message:"Ошибка получения"}, error)
        }
    }
}

module.exports = new ItemsController()