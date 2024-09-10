import mongoose, { Schema } from "mongoose"

export const transactionSchema: Schema = new Schema({
    day: { type: Date },
    description: { type: String },
    value: { type: Number },
    client: {type: String}
})