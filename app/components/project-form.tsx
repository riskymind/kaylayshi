"use client"
import React, { useEffect, useState } from 'react'
import { UploadButton } from '@/lib/uploadthing';
import {Project} from  "@/types/index"
import { useRouter } from 'next/navigation';
import {insertProjectSchema, updateProjectSchema} from "@/lib/validators"
import {z} from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {projectDefaultValues} from "@/lib/constants"
import {toast} from "sonner"
import Image from 'next/image';
import {createProject, updateProject} from "@/lib/actions/projects.actions"
import { Button } from '@/components/ui/button';


const ProjectForm = ({
    type,
    project,
    projectId
}: {
    type: "Create" | "Update"
    project?: Project
    projectId?: string
}) => {

const router = useRouter()

const schema = type === 'Update' ? updateProjectSchema : insertProjectSchema;
type ProjectFormSchema = z.infer<typeof schema>;

const form = useForm<ProjectFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: project && type === 'Update' ? project : projectDefaultValues,
  });

const [techInput, setTechInput] = useState('');
const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);

useEffect(() => {
  setValue('technologies', technologies);
})

 const onSubmit = async (values: ProjectFormSchema) => {
    // setValue('technologies', technologies); 
    if (type === 'Create') {
      const res = await createProject(values);
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      router.push('/admin/project');
    }

    if (type === 'Update') {
      if (!projectId) return router.push('/admin/project');
      const res = await updateProject({ ...values, id: projectId });
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      router.push('/admin/project');
    }
  };

   const { register, handleSubmit, setValue, watch, formState: { isSubmitting, errors } } = form;

  const images = watch('images');

  return (
    <form className='flex flex-col gap-8' method='POST' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='flex flex-col'>
            <label htmlFor="title" className='block font-medium mb-1'>Title</label>
            <input type="text" placeholder='Enter Project Title' 
            className='w-full border px-3 py-2 rounded' id='title' {...register("title")}/>
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>
        
        <div className='flex flex-col'>
            <label htmlFor="desc" className='block font-medium mb-1'>Description</label>
            <textarea id="desc" placeholder='Enter Project Description' className='w-full border px-3 py-2 rounded' {...register("description")}/>
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="tech" className='block font-medium mb-1'>Technologies</label>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                >
                    {tech}
                    <button
                    type="button"
                    onClick={() =>
                        setTechnologies(technologies.filter((_, i) => i !== index))
                    }
                    className="text-blue-500 hover:text-red-500"
                    >
                    ✕
                    </button>
                </span>
                ))}
            </div>
            <div className='flex gap-2'>
                <input type="text"  className="border border-gray-300 rounded px-3 py-2 w-full" placeholder="Type a tech and press Enter"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && techInput.trim()) {
                    e.preventDefault();
                    if (!technologies.includes(techInput.trim())) {
                        setTechnologies([...technologies, techInput.trim()]);
                        setTechInput('');
                    }
                    }
                }}/>
            </div>
        </div>
        
        <div className='flex flex-col gap-1'>
            <label className="block font-medium mb-1">Images</label>
            <div className="flex gap-4 items-center">
            {images.map((img: string, i: number) => (
                <Image key={i} src={img} alt="product" width={100} height={100} className="rounded" />
            ))}
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => setValue('images', [...images, res[0].url])}
                onUploadError={(error: Error) => {toast.error(error.message)}}
            />
            </div>
      </div>

      <div className='flex gap-2'>
          <div className='flex-1 flex-col'>
            <label htmlFor="git" className='block font-medium mb-1'>Github Link</label>
            <input type="text" placeholder='Enter Github Code Link' className='w-full border px-3 py-2 rounded' id='git' {...register("githubLink")}/>
            {errors.githubLink && <span className="text-red-500 text-sm">{errors.githubLink.message}</span>}
        </div>
        <div className='flex-1 flex-col'>
            <label htmlFor="demo" className='block font-medium mb-1'>Demo Link</label>
            <input type="text" placeholder='Enter Project Demo Link' className='w-full border px-3 py-2 rounded' id='demo' {...register("demoLink")}/>
            {errors.demoLink && <span className="text-red-500 text-sm">{errors.demoLink.message}</span>}
        </div>
      </div>

        <Button
            type='submit'
            size='lg'
            disabled={isSubmitting}
            className='button col-span-2 w-full'
          >
            {isSubmitting ? 'Submitting...' : `${type} Project`}
        </Button>
    </form>
  )
}

export default ProjectForm
