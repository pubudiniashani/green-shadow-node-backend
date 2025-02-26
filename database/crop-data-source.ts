import {PrismaClient} from "@prisma/client";
import Crop from "../model/crop";

const prisma = new PrismaClient();

export async function CropAdd(c: Crop){
    try{
        const newCrop  = await prisma.crop.create({
            data:{
                cropId: c.cropId,
                commonName:c.commonName,
                specificName: c.specificName,
                category:c.category,
                season:c.season,
                fieldId: c.fieldId
            }
        })
        console.log('Crop Added :',newCrop)
    }catch(err) {
        console.log("error adding crop", err);
    }
}

export async function CropDelete(id:string) {
    try{
        await prisma.crop.delete({
            where: {cropId: id}
        });
        console.log('Crop deleted :',id);
    }catch(err){
        console.log("error deleting crop", err);
    }
}

export async function getAllCrops(){
    try{
        return await prisma.crop.findMany();
    }catch(err){
        console.log("error getting crops from prisma data",err);
    }
}

export async function CropUpdate(id: string, c: Crop) {
    console.log(id);
    try {
        await prisma.crop.update({
            where: { cropId: id },
            data: {
                commonName: c.commonName,
                specificName: c.specificName,
                category: c.category,
                season: c.season,
                fieldId: c.fieldId
            }
        });
        console.log("Crop updated:", id);
    } catch (err) {
        console.log("Error updating crop", err);
    }
}
