import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.controllers.js";

const productRouter = Router();

//Consultar todos los productos
productRouter.get('/', getProducts)

//Consultar productos por el id
productRouter.get('/:idP', getProduct)

//Crear un nuevo producto
productRouter.post('/', createProduct)

//Actualizacion los productos mediante su id
productRouter.put('/:idP', updateProduct)

//Eliminar el producto mediante tu id
productRouter.delete('/:idP', deleteProduct)

export default productRouter