import { z } from "zod"

export const insertEducationSchema = z.object({
    degree:    z.string().min(3, 'Degree must be at least 3 characters'),
    school:    z.string().min(3, 'School must be at least 3 characters'),
    image:     z.string().min(3, 'Image must be at least 3 characters'),
    year:      z.string(),
    knowledge: z.array(z.string())
})

export const updateEducationSchema = insertEducationSchema.extend({
    id: z.string().min(1, "ID is required")
})

export const insertExperienceSchema = z.object({   
    role :     z.string().min(3, 'Role must be at least 3 characters'),
    company:   z.string().min(3, 'Company must be at least 3 characters'),
    location:  z.string().min(3, 'Location must be at least 3 characters'),
    image:     z.string().min(3, 'Image must be at least 3 characters'),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date",
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end date",
    }),
    duties:  z.array(z.string())
})

// Schema for updating experience
export const updateExperienceSchema = insertExperienceSchema.extend({
  id: z.string().min(1, 'ID is required'),
});


export const insertProjectSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    technologies: z.array(z.string()).min(1, 'Technologies must have at least one image'),
    images: z.array(z.string()).min(1, 'Images must have at least one image'),
    githubLink: z.string().min(3, 'Link must be at least 3 characters'),
    demoLink: z.string()
})

// Schema for updating projects
export const updateProjectSchema = insertProjectSchema.extend({
  id: z.string().min(1, 'Id is required'),
});


export const insertSkillSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    level: z.string(),
    image: z.string().min(3, 'Image must be at least 3 characters'),
    category: z.string()
})

// Schema for updating skill
export const updateSkillSchema = insertSkillSchema.extend({
  id: z.string().min(1, 'Id is required'),
});