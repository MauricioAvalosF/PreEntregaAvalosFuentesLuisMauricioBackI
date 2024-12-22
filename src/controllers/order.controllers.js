import orderModel from "../models/order.model.js";

export const getOrders = async (req,res) => {
    try {
        const orders = await orderModel.aggregate([
            {
                $match: {size: "medium"}
            },
            {
                $group: {_id: "$name", totalVentas: {$sum: "$price"}}
                //$group: {_id: "$name", totalQuantity: {$sum: "$quantity"}} //Stage 2: Agrupo por nombre y por suma de cantidades
            },
            {
                $sort: {totalQuantity: -1}
            },
            {
                $group: {_id: 1, orders: {$push: "$$ROOT"}}
            },
            {
                $project: {
                    "_id": 0,
                    orders: "$orders" 
                }
            },
            {
                $merge: {
                    into: "reports"
                }
            }
        ])
        console.log(orders);
        
        res.status(200).send("Reportes generados correactamente")

    } catch(e) {
        console.log(e)
        res.status(500).send("Error al consultar")
    }
}


export const createOrder = async (req,res) => {
    try {
        const order = req.body
        const respuesta = await orderModel.create(order)
        console.log(respuesta);
        res.status(201).send("Orden creada correctamente")
    } catch(e) {
        console.log(e);
        
        res.status(500).send("Error al crear Orden: ", e)
    }
}