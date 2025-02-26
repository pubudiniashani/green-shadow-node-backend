import {PrismaClient} from "@prisma/client";
import Field from "../model/field";

const prisma = new PrismaClient();

export async function FieldAdd(f: Field){
    try{
        const newField  = await prisma.field.create({
            data:{
                fieldId: f.fieldId,
                name:f.name,
                location: f.location,
                size:f.size
            }
        })
        console.log('Field Added :',newField)
    }catch(err) {
        console.log("error adding field", err);
    }
}

export async function FieldDelete(id:string) {
    try{
        await prisma.field.delete({
            where: {fieldId: id}
        });
        console.log('Field deleted :',id);
    }catch(err){
        console.log("error deleting field", err);
    }
}

export async function getAllFields(){
    try{
        return await prisma.field.findMany();
    }catch(err){
        console.log("error getting fields from prisma data",err);
    }
}

export async function FieldUpdate(id: string, f: Field) {
    console.log(id);
    try {
        await prisma.field.update({
            where: { fieldId: id },
            data: {
                name:f.name,
                location: f.location,
                size:f.size
            }
        });
        console.log("Field updated:", id);
    } catch (err) {
        console.log("Error updating field", err);
    }
}
