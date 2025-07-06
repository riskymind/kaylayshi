"use server"
import {prisma} from "@/db/prisma"
import { convertToPlainObject, formatError } from "../utils"
import { insertEducationSchema, updateEducationSchema } from "../validators"
import { z } from "zod"
import { revalidatePath } from "next/cache"

// Get all education
export async function getAllEducation() {
    const data = await prisma.education.findMany({})
    return convertToPlainObject(data)
}

// Get a single education by it's ID
export async function getEducationById(eduId: string) {
    const data = await prisma.education.findFirst({
        where: {id: eduId}
    })
    return convertToPlainObject(data)
}

// Create Education
export async function createEducation(data: z.infer<typeof insertEducationSchema>) {
    try {
        const education = insertEducationSchema.parse(data)
        await prisma.education.create({data: education})
        revalidatePath("/admin/education")

        return {success: true, message: "Education created successsfully"}
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}

export async function updateEducation(data: z.infer<typeof updateEducationSchema>) {
    try {
        const education = updateEducationSchema.parse(data)
        const eduExists = await prisma.education.findFirst({ where: {id: education.id}})

        if(!eduExists) throw new Error("Education is not found.")

        await prisma.education.update({
            where: {id: education.id},
            data: education
        })

        revalidatePath("/admin/education")
        return {success: true, message: "Education Updated successfully."}
    } catch (error) {
        return { success: false, message: formatError(error)}
    }
}


export async function deleteEducation(id:string) {
    try {
        const eduExists = await prisma.education.findFirst({
            where: {id}
        })
        if(!eduExists) throw new Error("Education is not found.")
        
        await prisma.education.delete({where: {id}})
        revalidatePath("/admin/education")
        return {success: true, message: "Education deleted successfully."}
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}