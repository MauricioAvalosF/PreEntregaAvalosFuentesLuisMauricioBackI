import { Router } from "express";
import { getCart, createCart, insertProductCart, updateProductsCart, updateQuantityProductCart, deleteCart, deleteProductCart } from "../controllers/carts.controllers.js";

const cartRouter = Router()

//Consultar productos de carritos
cartRouter.get('/:cid', getCart)

//Crear un carrito vacio
cartRouter.post('/', createCart)

//Guardar productos en carrito
cartRouter.post('/:cid/products/:pid', insertProductCart)

cartRouter.put('/:cid', updateProductsCart)

cartRouter.put('/:cid/products/:pid', updateQuantityProductCart)

cartRouter.delete('/:cid', deleteCart)

cartRouter.delete('/:cid/products/:pid', deleteProductCart)

export default cartRouter