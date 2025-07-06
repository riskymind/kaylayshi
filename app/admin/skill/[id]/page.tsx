import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Update Skill"
}
import { notFound } from 'next/navigation'
import { getSkillById } from '@/lib/actions/skills.actions'
import SkillForm from '@/app/components/skill-form'

const UpdateSkillPage = async (props: {
    params: Promise<{id: string}>
}) => {
    const {id} = await props.params
    const skill = await getSkillById(id)
    if(!skill) return notFound()
  return (
    <div className='container'>
        <h2 className='text-3xl font-bold'>Update Skill</h2>
        <div className='my-8'>
            <SkillForm type='Update' skill={skill} skillId={skill.id}/>
        </div>
    </div>
  )
}

export default UpdateSkillPage
