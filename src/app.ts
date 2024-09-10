import express from "express"
import router from "./routes"
import cors from "cors"
import mongoose from "mongoose"

function createApp() {
    const mongo_url = String(process.env.MONGO_URL)
    const origin = String(process.env.ORIGIN)
    const app = express()

    app.use(cors({
        origin: origin,
        methods: ['GET', 'POST', 'DELETE', 'PUT']
    }))

    app.use(express.json())
    app.use("/", router)

    mongoose.connect(mongo_url)
        .then(() => console.log("Server init"))
        .catch(err => console.error("Error in db:", err))

    return app
}

export default createApp
