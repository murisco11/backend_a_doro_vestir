import { raffleService } from "../services/raffle-service";
import { Request, Response} from "express"

export const raffleClients = async (req: Request, res: Response) => {
    const bodyValue = req.body
    const httpResponse = await raffleService(bodyValue)

    res.status(httpResponse.statusCode).json(httpResponse.body)
}   