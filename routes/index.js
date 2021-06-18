const {Router} = require('express')
const {getCustomers,postCustomers,putCustomers,deleteCustomer,getAddress,getStore} = require('../controllers/customer.controller')
const route = Router()

route.get('/',(req,res) => {res.send('Welcome API-REST Inventario!!!!')})
route.get('/customers',getCustomers)
route.get('/address',getAddress)
route.get('/store',getStore)

route.post('/customers',postCustomers)
route.put('/customers',putCustomers)

route.delete('/customers/:id_customer',deleteCustomer)

module.exports = route