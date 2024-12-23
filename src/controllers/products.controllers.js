import productModel from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try{
        const {limit, page, filter, metFilter,  ord} = req.query

        const pag = page !== undefined ? page : 1 
        const lim = limit !==  undefined ? limit : 10
        const query = metFilter  !== undefined ? {[metFilter]: filter} : {} 
        const orQuery = ord !== undefined ? {price: ord} : {} 

        const prods = await productModel.paginate(query, {limit: lim, page: pag, orQuery})

        console.log(prods)
        res.status(200).send(prods)
        // res.status(200).render('templates/home', {productos: prods, js: 'productos.js', css: 'productos.css'})

    }catch(e){
        res.status(500).send("Error al consultar los productos: ")
    }
}

export const getProduct = async (req, res) => {
    try{
        const idProd = req.params.idP
        const prod = await productModel.findById(idProd)
        if(prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no encontrado / inexistente")
    }catch(e){
        res.status(500).send("Error al consultar el producto: ")
    }
}

export const createProduct = async (req, res) => {
    try{
        const product = req.body
        const respuesta = await productModel.create(product)
        console.log(respuesta)
        res.status(201).send("Producto creado correctamente")
    }catch(e){
        console.log(e)
        res.status(500).send("Error al crear el producto: ")
    }
}

export const updateProduct = async (req, res) => {
    try{
        const idProd = req.params.idP
        const updateProduct = req.body
        const respuesta = await productModel.findByIdAndUpdate(idProd, updateProduct)
        res.status(201).send("Producto actualizado correctamente")
    }catch(e){
        res.status(500).send("Error al actualizar el producto: ")
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const idProd = req.params.idP
        const respuesta = await productModel.findByIdAndDelete(idProd)
        res.status(201).send("Producto eliminado correctamente")
    }catch(e){
        res.status(500).send("Error al eliminar el producto: ")
    }
}

/*import { Router } from "express";
import crypto from "crypto";
import { __dirname } from "../path.js";
import { promises as fs } from 'fs'
import path from "path";

const productRouter = Router();

const produstosPath = path.resolve(__dirname, '../src/db/productos.json')

//leemos el archivo
const productosData = await fs.readFile(produstosPath, 'utf-8')
const productos = JSON.parse(productosData)

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

export default productRouter*/