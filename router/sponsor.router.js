import express from "express";
import { addNewSponsor, deleteSponsor, deleteWorkerFromSponsor, getAllSponsor, getSingleSponsor, getSingleSponsorAdmin, pushNewWorkerToSponsor, updateSponsor, updateWorkerInSponsor } from "../controller/sponsor.controller.js";

const sponsorRouter = express.Router()
sponsorRouter.get("/getAllSponsor", getAllSponsor)
sponsorRouter.get("/getSingleSponsor/:sponsorId/:sourceNumber", getSingleSponsor)
sponsorRouter.get("/getSingleSponsorAdmin/:sponsorId", getSingleSponsorAdmin)
sponsorRouter.post("/addSponsor", addNewSponsor)
sponsorRouter.delete("/deleteSponsor/:id", deleteSponsor)
sponsorRouter.put("/updateSponsor/:id", updateSponsor)
sponsorRouter.put("/updateSponsor/:sponsorId", deleteWorkerFromSponsor)
sponsorRouter.put("/addWorker/:sponsorId", pushNewWorkerToSponsor)
sponsorRouter.put("/updateWorker/:sponsorId/:index", updateWorkerInSponsor)
sponsorRouter.put("/deleteWorker/:sponsorId/:index", deleteWorkerFromSponsor)

export default sponsorRouter