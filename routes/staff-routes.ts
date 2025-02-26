import express from "express";
import {getAllStaff, StaffAdd, StaffDelete, StaffUpdate} from "../database/staff-data-source";


const router = express.Router();

router.post("/add", async(req, res) => {
    const staff= req.body;
    try{
        const addedStaff = await StaffAdd(staff);
        res.send('Staff Added')
    }catch(err){
        console.log("error adding staff", err);
        res.status(400).send("error adding staff");
    }
})



router.put("/update/:id", async (req, res) => {
    const id: string = req.params.id;
    const staff = req.body;

    try {
        await StaffUpdate({ ...staff, staffId: id });
        res.send("Staff Updated");
    } catch (err) {
        console.log("Error updating staff", err);
        res.status(500).send("Error updating staff");
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id: string = req.params.id;

    try {
        await StaffDelete(id);
        res.send(`Staff with ID ${id} deleted successfully`);
    } catch (err) {
        console.error("Error deleting staff", err);

    }
});

router.get("/view", async (req, res) => {
    try {
        const staffList = await getAllStaff();
        res.json(staffList);
    } catch (err) {
        console.error("Error fetching staff", err);
        res.status(500).send("Error fetching staff list");
    }
});


export default router;