import asyncHandler from "express-async-handler"
import Sponsor from "../config/connection/model/sponsors.model.js"
import { deleteOne, getAll, updateOne } from "./factor.controller.js"

const deleteSponsor = deleteOne(Sponsor)
const updateSponsor = updateOne(Sponsor)
const getAllSponsor = getAll(Sponsor)

// Controller function to add a new sponsor along with its workers
const addNewSponsor = asyncHandler(async (req, res) => {
    const {
        sponsorId,
        sourceNumber,
        name,
        dateOfLastModification,
        workers,
    } = req.body;
    const sponsor = await Sponsor.findOne({ sponsorId })
    if (sponsor) {
        res.status(409).json({ message: "sponsor is already founded" })
    }
    // Validate request body
    if (!sponsorId || !sourceNumber || !name || !dateOfLastModification) {
        return res.status(400).json({ error: "All sponsor fields are required" });
    }

    // Validate workers array
    if (!Array.isArray(workers) || workers.length === 0) {
        return res.status(400).json({ error: "At least one worker must be provided" });
    }

    // Create a new sponsor document with the provided details
    const newSponsor = new Sponsor({
        sponsorId,
        sourceNumber,
        name,
        dateOfLastModification,
        workers,
    });

    // Save the new sponsor document to the database
    const savedSponsor = await newSponsor.save();

    // Respond with the saved sponsor document
    res.status(201).json(savedSponsor);
});
// Controller function to delete sponsor along with its workers
const deleteWorkerFromSponsor = asyncHandler(async (req, res) => {
    const { sponsorId, index } = req.params; // Assuming sponsorId is passed as a URL parameter

    // Find the sponsor document by its ID
    const sponsor = await Sponsor.findById(sponsorId);

    if (!sponsor) {
        return res.status(404).json({ error: "Sponsor not found" });
    }

    // Find the index of the worker to delete in the workers array
    // const index = sponsor.workers.findIndex(worker => worker._id == workerId);

    // if (index === -1) {
    //     return res.status(404).json({ error: "Worker not found in the sponsor" });
    // }

    // Remove the worker from the workers array
    sponsor.workers.splice(index, 1);

    // Save the updated sponsor document
    const updatedSponsor = await sponsor.save();

    // Respond with the updated sponsor document
    res.status(200).json(updatedSponsor);
});
// Controller function to push a new worker to an existing sponsor
const pushNewWorkerToSponsor = asyncHandler(async (req, res) => {

    const { sponsorId } = req.params; // Assuming sponsorId is passed as a URL parameter
    const { workers } = req.body; // Assuming new worker data is passed in the request body

    // Find the sponsor document by its ID
    const sponsor = await Sponsor.findOne({ sponsorId });

    if (!sponsor) {
        return res.status(404).json({ error: "Sponsor not found" });
    }

    // Push the new worker to the workers array
    sponsor.workers.push(...workers);

    // Save the updated sponsor document
    const updatedSponsor = await sponsor.save();

    // Respond with the updated sponsor document
    res.status(200).json(updatedSponsor);

});
// Controller function to update sponsor along with its workers
const updateWorkerInSponsor = asyncHandler(async (req, res) => {
    const { sponsorId, index } = req.params; // Assuming sponsorId and workerId are passed as URL parameters
    const updatedWorkerData = req.body; // Assuming updated worker data is passed in the request body

    // Find the sponsor document by its ID
    const sponsor = await Sponsor.findById(sponsorId);

    if (!sponsor) {
        return res.status(404).json({ error: "Sponsor not found" });
    }

    // Find the index of the worker to update in the workers array
    // const index = sponsor.workers.findIndex(worker => worker._id == workerId);

    // if (index === -1) {
    //     return res.status(404).json({ error: "Worker not found in the sponsor" });
    // }

    // Update the worker properties
    sponsor.workers[index] = { ...sponsor.workers[index], ...updatedWorkerData };

    // Save the updated sponsor document
    const updatedSponsor = await sponsor.save();

    // Respond with the updated sponsor document
    res.status(200).json(updatedSponsor);
});
// Controller function to get a single sponsor by sourceNumber and sponsorId
const getSingleSponsor = asyncHandler(async (req, res) => {
    const { sponsorId, sourceNumber } = req.params; // Assuming sourceNumber and sponsorId are passed as URL parameters

    // Find the sponsor document with the provided sourceNumber and sponsorId
    const data = await Sponsor.findOne({ sponsorId, sourceNumber });

    if (!data) {
        return res.status(404).json({ error: "Sponsor not found" });
    }

    // Respond with the found sponsor document
    res.status(200).json({ message: "founded", data });
});


export { getSingleSponsor, getAllSponsor, addNewSponsor, deleteSponsor, deleteWorkerFromSponsor, pushNewWorkerToSponsor, updateWorkerInSponsor, updateSponsor };
