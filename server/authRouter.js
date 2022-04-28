const Router = require('express')
const router = new Router()

//Authorization
const controller = require('./authController')
const {check} = require('express-validator')
const roleMiddleware = require('./middleware/roleMiddleware')

const ItemsController = require('./itemsController')
const OrderController = require('./ordersController')

router.post('/registration', [
    check('username', 'Имя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 6 и меньше 16').isLength({min:6, max:16}),
    ], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["ADMIN"]), controller.users)


router.post('/additems', roleMiddleware(["USER", "ADMIN"]), [check('name', 'Имя не может быть пустым').notEmpty()], ItemsController.addItems)
router.post('/delitems', roleMiddleware(["ADMIN"]), ItemsController.delItems)
router.get('/getitems', ItemsController.getItems)


router.post('/addorders',roleMiddleware(["USER", "ADMIN"],), OrderController.addOrders)


module.exports = router