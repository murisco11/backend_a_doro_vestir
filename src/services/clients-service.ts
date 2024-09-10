import { ClientModel } from "../models/client-model"
import { createClient, deleteClient, findAllClients, findClientByBirthday, findClientById, updateClient } from "../repositories/clients-repository"
import { badRequest, created, ok } from "../utils/http-response"


export const getAllClientsService = async () => {
    let response = null
    
    const data = await findAllClients()
    
    response = ok(data)

    return response
} 

export const getClientByIdService = async (param: any) => {
    let response = null
    
    const id = String(param.id)

    const data = await findClientById(id)
    
    response = ok(data)

    return response
} 

export const getClientsByBirthdayService = async (param: any) => {
    let response = null
    
    const birthday = String(param.birthday)

    const data = await findClientByBirthday(birthday)
    
    response = ok(data)

    return response
}

export const postClientsService = async (client : ClientModel) => {
    let response = null

    const body: ClientModel = client
    const new_client = await createClient(body)

    if (new_client) {
        response = created() 

    } else {
        response = badRequest()
    }

    return response
}

export const deleteClientService = async (param: any) => {
    let response = null

    const id = String(param.id)
    console.log(id)

    const deleted_client = await deleteClient(id)

    if (deleted_client) {
        response = created()
    } else {
        response = badRequest()
    }

    return response
}

export const updateClientService = async (client: ClientModel, param: any) => {
    let response = null

    const id = String(param.id)
    const body: ClientModel = client
    console.log(id)
    const updated_client = await updateClient(body, id)

    if (updated_client) {
        response = ok(updated_client)
    } else {
        response = badRequest()
    }

    return response 
}