import { TransactionModel } from "../models/transaction-model"
import { createTransaction, getTransactionsByClientIdRepository, getTransactionId, deleTransaction, updateTransaction, getDataTransactionRepository} from "../repositories/transactions-repository"
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

export const deleteTransactionByIdService = async (id: string) => {
    let response = null

    const body: string = id
    const transaction_deleted = await deleTransaction(body)

    if(transaction_deleted) {
        response = created()
    } else {
        response = badRequest()
    }


    return response
}

export const updateTransactionByIdService = async (body: any, param: string ) => {
    let response = null

    const id = param
    console.log('AUI', id)
    const transaction: TransactionModel = body

    const updated_transaction = await updateTransaction(transaction, id)

    if (updated_transaction) {
        response = ok(updated_transaction)
    } else {
        response = badRequest()
    }

    return response 
}

export const getDataTransactionService = async (id: string) => {
    let response = null

    const transaction = await getDataTransactionRepository(id)

    if (transaction) {
        response = ok(transaction)
    } else {
        response = badRequest()
    }

    return response
}