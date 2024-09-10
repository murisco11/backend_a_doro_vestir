import { Router } from "express"
import { deleteClient, getClients, getClientsByBirthday, getClientsById, postClients, updateClient } from "./controllers/clients-controller"
import { raffleClients } from "./controllers/raffle-controller"
import { postTransactions, getTransactionById, getTransactionsByClientId } from "./controllers/transactions-controller"

const router = Router()

router.get('/clients', getClients)
router.get('/clients/:id', getClientsById)
router.get('/clients/b/:birthday', getClientsByBirthday)
router.post('/clients', postClients)
router.delete('/clients/:id', deleteClient)
router.put('/clients/:id', updateClient)

router.get('/raffle', raffleClients)

router.get('/transactions/id/:id', getTransactionById)
router.get('/transactions/client/:id', getTransactionsByClientId)
router.post('/transactions', postTransactions)

export default router