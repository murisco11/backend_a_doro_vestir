import mongoose, { Schema } from "mongoose"

export const clientSchema: Schema = new Schema({
    name: { type: String },
    address: { type: String },
    birthday: { type: String},
    cpf: { type: Number },
    balance: { type: Number},
    telephone: { type: Number},
    status: {type: Boolean}
})