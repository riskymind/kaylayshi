import EducationForm from '@/app/components/education-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Update Education"
}
import { notFound } from 'next/navigation'
import { getEducationById } from '@/lib/actions/education.actions'

const UpdateEducationPage = async (props: {
    params: Promise<{id: string}>
}) => {
    const {id} = await props.params
    const edu = await getEducationById(id)
    if(!edu) return notFound()
  return (
    <div className='container'>
        <h2 className='text-3xl font-bold'>Update Education</h2>
        <div className='my-8'>
            <EducationForm type='Update' edu={edu} eduId={edu.id}/>
        </div>
    </div>
  )
}

export default UpdateEducationPage
