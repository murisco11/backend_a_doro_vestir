import { TransactionModel } from "../models/transaction-model"
import { createTransaction, getTransactionsByClientIdRepository, getTransactionId} from "../repositories/transactions-repository"
import { badRequest, created, ok } from "../utils/http-response"

export const getTransactionByIdService = async (id: string) => {
    let response = null

    const body: string = id
    const transaction = await getTransactionId(body)

    if (transaction) {
        response = ok(transaction)
    } else {
        response = badRequest()
    }

    return response
}

export const getTransactionsByClientIdService = async (id: string) => {
    let response = null

    const transaction = await getTransactionsByClientIdRepository(id)

    if (transaction) {
        response = ok(transaction)
    } else {
        response = badRequest()
    }

    return response
}

export const postTransactionService = async (transaction: TransactionModel) => {
    let response = null

    const body: TransactionModel = transaction
    const new_transaction = await createTransaction(body)

    response = created()

    return response
}