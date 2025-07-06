"use server"
import { prisma } from "@/db/prisma"
import { convertToPlainObject, formatError } from "../utils"
import { insertExperienceSchema, updateExperienceSchema } from "../validators"
import { z } from "zod"
import { revalidatePath } from "next/cache"


// Get all Experiences
export async function getAllExperience() {
    const data = await prisma.experience.findMany({})
    return convertToPlainObject(data)
}

// Get a single experience
export async function getExperienceById(expId: string) {
    const data = await prisma.experience.findFirst({
        where: {id: expId}
    })

    if(!data) return null

    const result = {
        ...data,
        startDate: data.startDate.toISOString().split("T")[0],
        endDate: data.endDate ? data.endDate?.toISOString().split("T")[0] : ""
    }

    return convertToPlainObject(result)
}

export async function createExperience(data: z.infer<typeof insertExperienceSchema>) {
    try {
        const { startDate, endDate, ...rest} = insertExperienceSchema.parse(data)

        await prisma.experience.create({
            data: {
                ...rest,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            }
        })

        revalidatePath("/admin/experience")

        return {
            success: true,
            message: "Experience created successfully"
        }
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}

export async function updateExperience(data: z.infer<typeof updateExperienceSchema>) {
    try {
        const {id, startDate, endDate, ...others} = updateExperienceSchema.parse(data)

        await prisma.experience.update({
            where: {id: id},
            data: {
                ...others,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            }
        })

        revalidatePath("/admin/experience")

        return {
            success: true,
            message: "Experience updated successfully"
        }
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}


export async function deleteExperience(id: string) {
    try {
        const experience = await prisma.experience.findFirst({where: {id: id}})
        if(!experience) throw new Error("Experience not found")

        await prisma.experience.delete({where: {id: id}})
        revalidatePath("/admin/experience")

        return {
            success: true,
            message: "Experience deleted successfully"
        }
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}