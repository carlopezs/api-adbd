const {Router} = require('express')
const {getCustomers} = require('../controllers/customer.controller')
const route = Router()

route.get('/',(req,res) => {res.send('Welcome API-REST Inventario!!!!')})
route.get('/customers',getCustomers)

module.exports = route