import express from "express"
import { addUser, deleteUser, findMariagePermit, getAllUsers, inquireAboutATransaction, updateUser } from "../controller/user.controller.js"
import { uploadImage } from "../config/upload.js"


const userRouter = express.Router()

userRouter.post("/addUser", uploadImage, addUser)
userRouter.get("/getAllUsers", getAllUsers)
userRouter.get("/mariagePermit/:idNumber/:outgoingNumber", findMariagePermit)
userRouter.post("/transaction", inquireAboutATransaction)
userRouter.delete("/deleteUser/:id", deleteUser)
userRouter.put("/updateUser/:id", updateUser)


export default userRouter