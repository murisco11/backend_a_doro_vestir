import mongoose from "mongoose"
import { TransactionModel } from "../models/transaction-model"
import { transactionSchema } from "../schemas/transaction-schema"
import { clients_model } from "./clients-repository"

const transaction_model = mongoose.model('transactions', transactionSchema)

export const createTransaction = async (body: TransactionModel) => {
    console.log(body)
    const new_transaction = new transaction_model(body)
    console.log(new_transaction)

    const id = body.client
    const client = await clients_model.findOneAndUpdate(
        { client: id },
        { $inc: { balance: body.value } }, 
        { new: true }
    )
    await new_transaction.save()
    return new_transaction
}

export const getTransactionId = async (id: string) => {
    const objectId = new mongoose.Types.ObjectId(id)

    const transaction = await transaction_model.findOne({ _id: objectId })

    return transaction

}

export const getTransactionsByClientIdRepository = async (body: string) => {
    const id = body

    const transaction = await transaction_model.find({
        client: id
    })

    return transaction
}