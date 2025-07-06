"use server"
// import { PrismaClient } from "@/app/generated/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { insertProjectSchema, updateProjectSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import {z} from "zod"
import { formatError } from "../utils";
import {prisma} from "@/db/prisma"

export async function getLatestProjects() {
    const data = await prisma.project.findMany({
        take: 3,
        orderBy: {createdAt: "desc"}
    })

    return convertToPlainObject(data)
}

export async function getAllProjects() {
    const data = await prisma.project.findMany({
        orderBy: {createdAt: "desc"}
    })

    return convertToPlainObject(data)
}

// Get single product by it's ID
export async function getProjectById(projectId: string) {
    const data =  await prisma.project.findFirst({
        where: {id: projectId}
    })

    return convertToPlainObject(data)
}

// Create a project
export async function createProject(data: z.infer<typeof insertProjectSchema>) {
    try {
        const project = insertProjectSchema.parse(data)
        await prisma.project.create({data: project})

        revalidatePath("/admin/project")

        return {
            success: true,
            message: "Project created successfully"
        }
    } catch (error) {
        return {success: false, message: formatError(error)}
    }
}

// Update a product
export async function updateProject(data: z.infer<typeof updateProjectSchema>) {
  try {
    const project = updateProjectSchema.parse(data);
    const projectExists = await prisma.project.findFirst({
      where: { id: project.id },
    });

    if (!projectExists) throw new Error('Project not found');

    await prisma.project.update({
      where: { id: project.id },
      data: project,
    });

    revalidatePath('/admin/project');

    return {
      success: true,
      message: 'Project updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Delete a Project
export async function deleteProject(id: string) {
    try {
      const projectExists = await prisma.project.findFirst({
      where: { id },
    });

    if (!projectExists) throw new Error('Project not found');

    await prisma.project.delete({ where: { id } });

    revalidatePath('/admin/project');

    return {
      success: true,
      message: 'Project deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
