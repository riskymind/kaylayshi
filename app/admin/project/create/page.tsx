import ProjectForm from '@/app/components/project-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Add Project"
}

const CreateProjectPage = () => {
  return (
    <div className='container'>
        <h2 className='text-3xl font-bold'>Add Project</h2>
        <div className='my-8'>
            <ProjectForm type='Create'/>
        </div>
    </div>
  )
}

export default CreateProjectPage
