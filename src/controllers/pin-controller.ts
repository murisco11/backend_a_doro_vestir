import { Request, Response } from "express"
import jwt from "jsonwebtoken"

export const generatePin = (req: Request, res: Response) => {
    const PASSWORD = process.env.PASSWORD
    const SECRET_KEY = process.env.SECRET_KEY

    if(!SECRET_KEY) {
        return
    }

    const { password } = req.body

    if (password === PASSWORD) {
        const token = jwt.sign({ user: 'sistema' }, SECRET_KEY, { expiresIn: '60d' })
        return res.json({ token })
    }

    return res.status(401).json({ message: 'Senha incorreta' })
}