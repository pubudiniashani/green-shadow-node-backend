import express from "express";
import {FieldAdd, FieldDelete, FieldUpdate, getAllFields} from "../database/field-data-source";

const router = express.Router();

router.post("/add", async(req, res) => {
    const field= req.body;
    try{
        const addedField = await FieldAdd(field);
        res.send('Field Added')
    }catch(err){
        console.log("error adding field", err);
        res.status(400).send("error adding field");
    }
})

router.delete("/delete/:id", async (req, res) => {
    const id: string = req.params.id;
    try{
        await FieldDelete(id);
        res.send('Field Deleted');
    }catch(err){
        console.log("error deleting field", err);
    }
})

router.put("/update/:id",async (req, res) => {
    const id: string = req.params.id;

    console.log(id);
    const field  = req.body;

    try{
        await FieldUpdate(id, field);
        res.send('Field Updated');
    }catch(err){
        console.log("error updating field", err);
    }
})

router.get("/view", async (req, res) => {
    try{
        const fields=  await getAllFields();
        res.json(fields);
    }catch(err){
        console.log("error getting fields", err);
    }
})

router.get("/", (req, res) => {
    res.send("Field Route Working!");
});

export default router;