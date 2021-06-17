const {Router} = require('express')
const {getCustomers,postCustomers,putCustomers,deleteCustomer} = require('../controllers/customer.controller')
const route = Router()

route.get('/',(req,res) => {res.send('Welcome API-REST Inventario!!!!')})
route.get('/customers',getCustomers)
route.post('/customers',postCustomers)
route.put('/customers',putCustomers)

route.delete('/customers',deleteCustomer)

module.exports = route