import express from 'express'
import productRouter from './routes/productos.js'
import { __dirname } from './path.js'
import cartRouter from './routes/cart.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static(__dirname +'/public'))

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)

app.listen(PORT, () => {
    console.log("Servidor on port", PORT)
})