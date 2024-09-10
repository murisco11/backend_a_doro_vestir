import { RaffleModel } from "../models/raffle-model"
import { raffleClients } from "../repositories/clients-repository";
import { ok } from "../utils/http-response";

    export const raffleService = async (raffle: RaffleModel) => {
        let response = null

        const raffle_config: RaffleModel = raffle
        const clients_raffle = await raffleClients(raffle_config)

        const random_index = Math.floor(Math.random() * clients_raffle.length)
        const winner = clients_raffle[random_index]

        response = ok(winner)

        return response
    }