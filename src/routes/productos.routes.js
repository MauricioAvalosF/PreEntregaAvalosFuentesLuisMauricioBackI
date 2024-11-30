import { Router } from "express";
import crypto from "crypto";
import { __dirname } from "../path.js";
import { promises as fs } from 'fs'
import path from "path";

const productRouter = Router();

const produstosPath = path.resolve(__dirname, '../src/db/productos.json')

//leemos el archivo
const productosData = await fs.readFile(produstosPath, 'utf-8')
const productos = JSON.parse(productosData)

//Consultar todos los productos
productRouter.get('/', (req, res) => {
    const { limit } = req.query
    const products = productos.slice(0, limit)
    res.status(200).render('templates/home', {productos: products, js: 'productos.js', css: 'productos.css'})
})

//Consultar productos por el id
productRouter.get('/:idP', (req, res) => {
    const idProducto = req.params.idP
    const producto = productos.find(prod => prod.id == idProducto)

    if (producto) {
        res.status(200).send(producto)
    } else {
        res.status(404).send({ mensaje: "El producto no existe" })
    }
})

//Crear un nuevo producto
productRouter.post('/', async (req, res) => {
    const { title, description, code, price, category, stock } = req.body
    const nuevoProducto = {
        id: crypto.randomBytes(10).toString('hex'),
        title: title,
        description: description,
        code: code,
        price: price,
        category: category,
        stock: stock,
        status: true,
        thumbnails: []
    }
    productos.push(nuevoProducto)
    await fs.writeFile(produstosPath, JSON.stringify(productos))
    res.status(201).send({ mensaje: `Producto creado correctamente con el id: ${nuevoProducto.id}` })
})

//Actualizacion los productos mediante su id
productRouter.put('/:idP', async (req, res) => {
    const idProducto = req.params.idP
    const { title, description, code, price, category, stock, status, thumbnails } = req.body
    const indice = productos.findIndex(prod => prod.id == idProducto)
    console.log(indice)

    if (indice != -1) {
        productos[indice].title = title
        productos[indice].description = description
        productos[indice].code = code
        productos[indice].price = price
        productos[indice].category = category
        productos[indice].stock = stock
        productos[indice].status = status
        productos[indice].thumbnails = thumbnails

        await fs.writeFile(produstosPath, JSON.stringify(productos))
        res.status(200).send({ mensaje: "Producto actualizado con exito" })
    } else {
        res.status(404).send({ mensaje: "El producto no existe o no encontrado" })
    }
})

//Eliminar el producto mediante tu id
productRouter.delete('/:idP', async (req, res) => {
    const idProducto = req.params.idP
    const indice = productos.findIndex(prod => prod.id == idProducto)

    if (indice != -1) {
        productos.splice(indice, 1)

        await fs.writeFile(produstosPath, JSON.stringify(productos))
        res.status(200).send({ mensaje: "Producto eliminado correctamente" })
    } else {
        res.status(404).send({ mensaje: "El producto no existe" })
    }
})

export default productRouter