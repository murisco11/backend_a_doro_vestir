import { Request, Response } from "express"
import { postTransactionService, getTransactionByIdService, getTransactionsByClientIdService, deleteTransactionByIdService, updateTransactionByIdService, getDataTransactionService } from "../services/transactions-service"

export const postTransactions = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await postTransactionService(bodyValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}


export const getTransactionById = async (req: Request, res: Response) => {
    const paramValue = String(req.params.id)
    const httpResponse = await getTransactionByIdService(paramValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const getTransactionsByClientId = async (req: Request, res: Response) => {
    const paramValue = String(req.params.id)

    const httpResponse = await getTransactionsByClientIdService(paramValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}


export const deleteTransactionById = async (req: Request, res: Response) => {
    const paramValue = String(req.params.id)

    const httpResponse = await deleteTransactionByIdService(paramValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const updateTransactionById = async (req: Request, res: Response) => {
    const paramValue = String(req.params.id)
    const bodyValue = req.body

    const httpResponse = await updateTransactionByIdService(bodyValue, paramValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const getDataTransaction = async (req: Request, res: Response) => {
    const paramValue = String(req.params.id)

    const httpResponse = await getDataTransactionService(paramValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}