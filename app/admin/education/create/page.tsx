import EducationForm from '@/app/components/education-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Add Education"
}

const CreateEducationPage = () => {
  return (
    <div className='container'>
        <h2 className='text-3xl font-bold'>Add Education</h2>
        <div className='my-8'>
            <EducationForm type='Create'/>
        </div>
    </div>
  )
}

export default CreateEducationPage
