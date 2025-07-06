import ExpForm from "@/app/components/experience-form";
import { Metadata } from "next";
import {getExperienceById} from "@/lib/actions/experience.actions"

export const metadata: Metadata = {
    title: "Update Experience"
}

import React from 'react'
import { notFound } from "next/navigation";

const UpdateExperiencePage = async (props: {
    params: Promise<{id: string}>
}) => {
    const { id } = await props.params
    const exp = await getExperienceById(id)

    if(!exp) return notFound()

  return (
    <div className='container'>
        <h2 className='text-3xl font-bold'>Update Experience</h2>
        <div className='my-8'>
            <ExpForm type='Update' exp={exp} expId={exp.id}/>
        </div>
    </div>
  )
}

export default UpdateExperiencePage
