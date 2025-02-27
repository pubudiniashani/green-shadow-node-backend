import express from "express";
import {CropAdd, CropDelete, CropUpdate, getAllCrops} from "../database/crop-data-source";


const router = express.Router();

router.post("/add", async(req, res) => {
    const crop= req.body;
    try{
        const addedCrop = await CropAdd(crop);
        res.send('Crop Added')
    }catch(err){
        console.log("error adding crop", err);
        res.status(400).send("error adding crop");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: string = req.params.id;
    try{
        await CropDelete(id);
        res.send('Crop Deleted');
    }catch(err){
        console.log("error deleting crop", err);
    }
})

router.put("/update/:id",async (req, res) => {
    const id: string = req.params.id;

    console.log(id);
    const crop  = req.body;

    try{
        await CropUpdate(id, crop);
        res.send('Crop Updated');
    }catch(err){
        console.log("error updating crop", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const crops=  await getAllCrops();
        res.json(crops);
    }catch(err){
        console.log("error getting crops", err);
    }
})



export default router;