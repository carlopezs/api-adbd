const express = require('express')
const cors= require('cors')
const app = express()

app.use(cors())
//middlewears
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(require('./routes/index'))

/* app.listen(3000) */
app.listen(process.env.PORT || 3000)
console.log('escuchando puerto 3000')