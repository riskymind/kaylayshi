import ExpForm from '@/app/components/experience-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Add Experience"
}

const CreateExperiencePage = () => {
  return (
    <div className='container'>
        <h2 className='text-3xl font-bold'>Add Experience</h2>
        <div className='my-8'>
            <ExpForm type='Create'/>
        </div>
    </div>
  )
}

export default CreateExperiencePage
