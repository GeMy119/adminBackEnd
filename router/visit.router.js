import express from "express"
import { uploadImage } from "../config/upload.js"
import { addVisit, deleteVisit, findVisit, findVisitAdmin, getAllVisit, updateVisit } from "../controller/visit.controller.js"


const visitRouter = express.Router()

visitRouter.post("/addVisit", uploadImage, addVisit)
visitRouter.get("/getAllVisits", getAllVisit)
visitRouter.get("/findVisit/:visaNo", findVisit)
visitRouter.get("/findVisitAdmin/:visaNo", findVisitAdmin)
visitRouter.delete("/deleteVisit/:id", deleteVisit)
visitRouter.put("/updateVisit/:id", updateVisit)


export default visitRouter