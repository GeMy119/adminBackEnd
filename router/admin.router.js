import express from "express"
import { deleteAdmin, login, register } from "../controller/admin.controller.js"

const adminRouter = express.Router()
adminRouter.post("/register", register)
adminRouter.post("/login", login)
adminRouter.delete("/deleteAdmin/:id", deleteAdmin)


export default adminRouter