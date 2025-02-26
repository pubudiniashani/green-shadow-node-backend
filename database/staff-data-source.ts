import {PrismaClient} from "@prisma/client";
import Staff from "../model/staff";

const prisma = new PrismaClient();

export async function StaffAdd(s: Staff){
    try {
        await prisma.$transaction(async (tx) => {

            const newStaff = await tx.staff.create({
                data: {
                    staffId: s.staffId,
                    firstName: s.firstName,
                    lastName: s.lastName,
                    gender: s.gender,
                    email: s.email,
                    address: s.address,
                    contact: s.contact
                }
            });

            if (s.fieldIds.length > 0) {
                await tx.fieldStaff.createMany({
                    data: s.fieldIds.map(fieldId => ({
                        staffId: (newStaff as Staff).staffId,
                        fieldId: fieldId
                    }))
                });
            }

            console.log('Crop Added :',newStaff)

        })
    }catch(err) {
        console.log("error adding crop", err);
    }
}

export async function StaffUpdate(s: Staff) {
    try {
        await prisma.$transaction(async (tx) => {

            const updatedStaff = await tx.staff.update({
                where: { staffId: s.staffId },
                data: {
                    firstName: s.firstName,
                    lastName: s.lastName,
                    gender: s.gender,
                    email: s.email,
                    address: s.address,
                    contact: s.contact
                }
            });

            await tx.fieldStaff.deleteMany({
                where: { staffId: s.staffId }
            });

            if (s.fieldIds.length > 0) {
                await tx.fieldStaff.createMany({
                    data: s.fieldIds.map(fieldId => ({
                        staffId: s.staffId,
                        fieldId: fieldId
                    }))
                });
            }

            console.log('Staff Updated:', updatedStaff);
        });
    } catch (err) {
        console.error("Error updating staff", err);
    }
}

export async function StaffDelete(staffId: string) {
    try {
        await prisma.$transaction(async (tx) => {

            const existingStaff = await tx.staff.findUnique({
                where: { staffId }
            });

            if (!existingStaff) {
                throw new Error(`Staff with ID ${staffId} does not exist`);
            }


            await tx.fieldStaff.deleteMany({
                where: { staffId }
            });


            await tx.staff.delete({
                where: { staffId }
            });

            console.log(`Staff with ID ${staffId} deleted successfully`);
        });
    } catch (err) {
        console.error("Error deleting staff", err);

    }
}

export async function getAllStaff() {
    try {
        return await prisma.staff.findMany();
    } catch (err) {
        console.log("Error getting staff from Prisma data", err);
    }
}
