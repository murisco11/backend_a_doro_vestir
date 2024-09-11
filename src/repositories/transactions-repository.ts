import mongoose from "mongoose"
import { TransactionModel } from "../models/transaction-model"
import { transactionSchema } from "../schemas/transaction-schema"
import { clients_model } from "./clients-repository"

const transaction_model = mongoose.model('transactions', transactionSchema)

export const createTransaction = async (body: TransactionModel) => {
    const new_transaction = new transaction_model(body)

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

export const getDataTransactionRepository = async (body: string) => {
    const objectId = new mongoose.Types.ObjectId(body)

    const transaction = await transaction_model.findById(objectId)

    return transaction
}

export const deleTransaction = async (body: string) => {
    const objectId = new mongoose.Types.ObjectId(body)

    const old_transaction = await transaction_model.findById(body)

    if (!old_transaction) { 
        return
    }

    await clients_model.findOneAndUpdate(
        { client: old_transaction.client },
        { $inc: { balance: (- old_transaction.value) } },
        { new: true }
    )

    const deleted_transaction = await transaction_model.findByIdAndDelete(objectId)

    return deleted_transaction
}

export const updateTransaction = async (transaction: TransactionModel, id: string) => {

    const objectId = new mongoose.Types.ObjectId(id)
    const transaction_new_body = transaction

    const old_transaction = await transaction_model.findById(id)

    if (!old_transaction) {
        return
    }
    
    const updated_transaction = await transaction_model.findByIdAndUpdate(objectId, transaction_new_body, { new: true })
    
    await clients_model.findOneAndUpdate(
        { client: id },
        { $inc: { balance: (transaction.value - old_transaction.value) } },
        { new: true }
    )

    return updated_transaction
}

