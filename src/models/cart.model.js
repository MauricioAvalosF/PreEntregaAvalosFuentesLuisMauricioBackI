import { Schema, model } from "mongoose";

const cartShema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})

cartShema.pre('findOne', function() {
    this.populate('products.id_prod')
})

const cartModel = model("cart", cartShema)

export default cartModel