import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllSkills } from "@/lib/actions/skills.actions"
import {FrontEndSkill, BackendSkill} from "@/types"
import FrontendCard from '@/app/components/FrontendCard'
import BackendCard from '@/app/components/BackendCard'
import AICard from '@/app/components/AICard'

const SkillPage = async () => {
  const skills: BackendSkill[] = await getAllSkills()

  const frontEndSkill: FrontEndSkill[] = skills
  .filter(skill => skill.category === "frontend")
  .map(skill => ({
    title: skill.title,
    level: skill.level,
    image: skill.image,
    category: skill.category
  }))
  

  const backendSkill: FrontEndSkill[] = skills
  .filter(skill => skill.category === "backend")
  .map(skill => ({
    title: skill.title,
    level: skill.level,
    image: skill.image,
    category: skill.category
  }))
  

  const aiSkill: FrontEndSkill[] = skills
  .filter(skill => skill.category === "ai")
  .map(skill => ({
    title: skill.title,
    level: skill.level,
    image: skill.image,
    category: skill.category
  }))

 
  
  return (
    <Tabs defaultValue="frontend" >
    <TabsList className='w-full'>
      <TabsTrigger value="frontend">FrontEnd</TabsTrigger>
      <TabsTrigger value="backend">BackEnd</TabsTrigger>
      <TabsTrigger value="ai">AI</TabsTrigger>
      <TabsTrigger value="others">Others</TabsTrigger>
    </TabsList>
    <TabsContent value="frontend" className="grid md:grid-cols-3 gap-4">
      {frontEndSkill.map((skill, index) => (
        <div key={index} className='my-2'>
          <FrontendCard skill={skill}/>
        </div>
      ))}
    </TabsContent>

    <TabsContent value="backend" className="grid md:grid-cols-3 gap-4">
      {backendSkill.map((skill, index) => (
          <div key={index} className='my-2'>
            <BackendCard skill={skill}/>
          </div>
        ))}
    </TabsContent>

    <TabsContent value="ai" className="grid md:grid-cols-3 gap-4">
      {aiSkill.map((skill, index) => (
          <div key={index} className='my-2'>
            <AICard skill={skill}/>
          </div>
        ))}
    </TabsContent>

    <TabsContent value="others" className="grid md:grid-cols-3 gap-4">
      <span>CI/CD</span>
      <span>Git / GitHub</span>
      <span>npm / yarn / pnpm</span>
    </TabsContent>
  </Tabs>
  )
}

export default SkillPage
