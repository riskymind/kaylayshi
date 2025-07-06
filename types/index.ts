import { insertEducationSchema, insertExperienceSchema, insertProjectSchema, insertSkillSchema } from "@/lib/validators"
import {z} from "zod"

export interface BackendProject {
    id: string
    title: string
    description: string
    technologies: string[]
    images: string[]
    githubLink: string
    demoLink: string
}

export interface BackendSkill {
    id: string
    title: string
    level: string
    image: string
    category: string
}

export interface BackendExperience {
    id:        string    
    role:      string
    company:   string
    location:  string
    image:     string
    startDate: Date
    endDate?:  Date | null
    duties:    string[]
}

export interface BackendEducation {
    id:        string  
    degree:    string
    school:    string
    image:     string
    year:      string
    knowledge: string[]
}

export type FrontEndEducation = z.infer<typeof insertEducationSchema>
export type FrontEndExperience = z.infer<typeof insertExperienceSchema>
export type FrontEndProject = z.infer<typeof insertProjectSchema>
export type FrontEndSkill = z.infer<typeof insertSkillSchema>

export type Education = z.infer<typeof insertEducationSchema> & {id: string}
export type Experience = z.infer<typeof insertExperienceSchema> & {id: string}
export type Project = z.infer<typeof insertProjectSchema> & {id: string, createdAt: Date}
export type Skill = z.infer<typeof insertSkillSchema> & { id: string }


