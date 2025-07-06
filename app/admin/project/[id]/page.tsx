import { Metadata } from "next";
import {getProjectById} from "@/lib/actions/projects.actions"

export const metadata: Metadata = {
    title: "Update Project"
}

import React from 'react'
import { notFound } from "next/navigation";
import ProjectForm from "@/app/components/project-form";

const UpdateProjectPage = async (props: {
    params: Promise<{id: string}>
}) => {
    const { id } = await props.params
    const project = await getProjectById(id)

    if(!project) return notFound()

  return (
    <div className='container'>
        <h2 className='text-3xl font-bold'>Update Project</h2>
        <div className='my-8'>
            <ProjectForm type='Update' project={project} projectId={project.id}/>
        </div>
    </div>
  )
}

export default UpdateProjectPage
