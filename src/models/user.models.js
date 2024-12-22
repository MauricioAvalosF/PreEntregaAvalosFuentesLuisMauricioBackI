import { Schema, model } from "mongoose";

const userShema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    }
})

export const userModel = model("users", userShema)