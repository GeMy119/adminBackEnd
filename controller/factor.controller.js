import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";

const createOne = (Model) =>
    expressAsyncHandler(async (req, res) => {
        const newDoc = await Model.create(req.body);
        res.status(201).json({ data: newDoc });
    });
const updateOne = (Model) =>
    expressAsyncHandler(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!document) {
            return next(
                new ApiError(`No document for this id ${req.params.id}`, 404)
            );
        }
        // Trigger "save" event when update document
        await document.save();
        res.status(200).json({ data: document });
    });
const deleteOne = (Model) =>
    expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const document = await Model.findByIdAndDelete(id);

        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404));
        }

        // Trigger "remove" event when update document
        // document.remove();
        res.status(200).json({ message: "deleted" });
    });
const getAll = (Model) =>
    expressAsyncHandler(async (req, res) => {
        let { page, size } = req.query;

        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 10;
        }
        const limit = parseInt(size);
        const skip = (page - 1) * size;
        //console.log(limit , skip)
        const allDocument = await Model.find({})
            .limit(limit)
            .skip(skip);
        const all = await Model.countDocuments();
        const allPages = Math.ceil(all / limit);
        //console.log(allPages);
        res
            .status(200)
            .json({ message: "all document", page, size, allPages, all, data: allDocument });
    });

export {
    createOne,
    updateOne,
    deleteOne,
    getAll
}