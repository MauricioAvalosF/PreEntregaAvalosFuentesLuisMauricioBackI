import { Router } from "express";
import crypto from "crypto";
import { __dirname } from "../path.js";
import { promises as fs } from 'fs'
import path from "path";

const cartRouter = Router()

const carritosPath = path.resolve(__dirname, '../src/db/carritos.json')

//leemos el archivo
const carritosData = await fs.readFile(carritosPath, 'utf-8')
const carritos = JSON.parse(carritosData)

//Consultar productos de carritos
cartRouter.get('/:idC', (req, res) => {
    const idCarrito = req.params.idC
    const carrito = carritos.find(car => car.id == idCarrito)

    if (carrito) {
        res.status(200).send(carrito.products)
    } else {
        res.status(404).send({ mensaje: "El carrito no existe" })
    }
})

//Crear un carrito vacio
cartRouter.post('/', async (req, res) => {
    const newCarrito = {
        id: crypto.randomBytes(5).toString('hex'),
        products: []
    }

    carritos.push(newCarrito)
    await fs.writeFile(carritosPath, JSON.stringify(carritos))
    res.status(200).send({ mensaje: `Carrito creado con exito, con id de ${newCarrito.id}` })
})

//Guardar productos en carrito
cartRouter.post('/:idC/products/:idP', async (req, res) => {
    const idCarrito = req.params.idC
    const { quantity } = req.body
    const idProducto = req.params.idP
    const carrito = carritos.find(car => car.id == idCarrito)

    if (carrito) {
        const indice = carrito.products.findIndex(prod => prod.id == idProducto)
        if (indice != -1) {
            carrito.products[indice].quantity = quantity
        } else {
            carrito.products.push({ id: idProducto, quantity: quantity })
        }

        await fs.writeFile(carritosPath, JSON.stringify(carritos))
        res.status(200).send({ mensaje: "Carrito actualizado con exito" })
    } else {
        res.status(404).send({ mensaje: "El carrito no existe" })
    }
})

export default cartRouter