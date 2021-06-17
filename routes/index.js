const {Router} = require('express')
const {getCustomers,postCustomers,putCustomers} = require('../controllers/customer.controller')
const route = Router()

route.get('/',(req,res) => {res.send('Welcome API-REST Inventario!!!!')})
route.get('/customers',getCustomers)
route.post('/customers',postCustomers)
route.put('/customers',putCustomers)

module.exports = route