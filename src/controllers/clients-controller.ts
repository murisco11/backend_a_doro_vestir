import { deleteClientService, getAllClientsService, getClientByIdService, getClientsByBirthdayService, postClientsService, updateClientService } from "../services/clients-service"
import { Response, Request} from "express"

export const getClients = async (req: Request, res: Response) => {
    const httpResponse = await getAllClientsService()
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const getClientsByBirthday = async (req: Request, res: Response) => {
    const bodyParams = req.params
    const httpResponse = await getClientsByBirthdayService(bodyParams)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const getClientsById = async (req: Request, res: Response) => {
    const bodyParams = req.params
    const httpResponse = await getClientByIdService(bodyParams)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const postClients = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await postClientsService(bodyValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const deleteClient = async (req: Request, res: Response) => {
    const bodyParams = req.params
    const httpResponse = await deleteClientService(bodyParams)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}

export const updateClient = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const param = req.params
    console.log(param)
    console.log(bodyValue)
    const httpResponse = await updateClientService(bodyValue, param)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}