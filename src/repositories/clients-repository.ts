import { ClientModel } from "../models/client-model"
import { RaffleModel } from "../models/raffle-model"
import mongoose from "mongoose"
import { clientSchema } from "../schemas/clients-schema"
import formatDate from "../utils/formatDate"

export const clients_model = mongoose.model('clients', clientSchema)

export const findAllClients = async () => {
    const clients = await clients_model.find({})
    
    return clients
}

export const findClientById = async (body: string) => {
    const objectId = new mongoose.Types.ObjectId(body)
    const clients = await clients_model.find({ _id: objectId })
    
    return clients
}

export const findClientByBirthday = async (body: string) => {
    const extractMonthAndDay = (date: string) => {
        const [day, month] = date.split('-')
        return { day, month }
    }

    const { day: bodyDay, month: bodyMonth } = extractMonthAndDay(body)

    const clients = await clients_model.find({}).exec()

    const filteredClients = clients.filter(client => {
        const { day, month } = extractMonthAndDay(client.birthday)
        return day === bodyDay && month === bodyMonth
    })

    return filteredClients
}


export const createClient = async (body: ClientModel) => {
    const name = body.name
    const birthday = formatDate(body.birthday)

    const repeated_client = await clients_model.findOne({ name: name })
    if (repeated_client) {
        return
    } else {
        const new_client = new clients_model({
            name: name,
            address: body.address,
            birthday: birthday,
            cpf: body.cpf,
            identity: body.identity,
            balance: body.balance,
            telephone: body.telephone,
            status: body.status
        })

        await new_client.save()

        return new_client
    }
}

export const deleteClient = async (id: string) => {
    const objectId = new mongoose.Types.ObjectId(id)
    const deleted_client = clients_model.findByIdAndDelete(objectId)

    return deleted_client
}

export const updateClient = async (body: ClientModel, id: string) => {
    const objectId = new mongoose.Types.ObjectId(id)
    const client_new_body = body
    
    const updated_client = clients_model.findByIdAndUpdate(objectId, client_new_body)

    return updated_client
}

export const raffleClients = async (raffle: RaffleModel) => {
    const raffle_config = raffle
    let clients

    if (raffle_config.all) {
        clients = await clients_model.find({ status: true })
    } else {
        clients = await clients_model.find({})
    }

    return clients
}
