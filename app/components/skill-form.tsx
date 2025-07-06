"use client"
import { UploadButton } from '@/lib/uploadthing';
import {Skill} from  "@/types/index"
import { useRouter } from 'next/navigation';
import {insertSkillSchema, updateSkillSchema} from "@/lib/validators"
import {z} from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {skillDefaultValues} from "@/lib/constants"
import {toast} from "sonner"
import Image from 'next/image';
import {createSkill, updateSkill} from "@/lib/actions/skills.actions"
import { Button } from '@/components/ui/button';


const SkillForm = ({
    type,
    skill,
    skillId
}: {
    type: "Create" | "Update"
    skill?: Skill
    skillId?: string
}) => {

const router = useRouter()

const schema = type === 'Update' ? updateSkillSchema : insertSkillSchema;
type SkillFormSchema = z.infer<typeof schema>;

const form = useForm<SkillFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: skill && type === 'Update' ? skill : skillDefaultValues,
  });


 const onSubmit = async (values: SkillFormSchema) => {
    if (type === 'Create') {
      const res = await createSkill(values);
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      router.push('/admin/skill');
    }

    if (type === 'Update') {
      if (!skillId) return router.push('/admin/skill');
      const res = await updateSkill({ ...values, id: skillId });
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      router.push('/admin/skill');
    }
  };

   const { register, handleSubmit, setValue, watch, formState: { isSubmitting, errors } } = form;

  const image = watch('image');

  return (
    <form className='flex flex-col gap-8' method='POST' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='flex flex-col'>
            <label htmlFor="title" className='block font-medium mb-1'>Title</label>
            <input type="text" placeholder='Enter Skill Name' 
            className='w-full border px-3 py-2 rounded' id='title' {...register("title")}/>
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
            <label className="block font-medium mb-1">Logo</label>
            <div className="flex gap-4 items-center">    
            <Image src={image} alt="Skill logo" width={100} height={100} className="rounded" />
            <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        if (!res?.[0]?.url) {
                        toast.error("Upload failed or file missing");
                        return;
                        }
                        console.log("Uploaded file:", res[0].url);
                        setValue('image', res[0].url);
                    }}
                    onUploadError={(error) => {toast.error(error.message);}}
                />
            </div>
        </div>
        
       <div className="flex justify-between gap-2">
         <div className='flex-1 flex-col'>
            <label htmlFor="level" className='block font-medium mb-1'>Level</label>
            <input type="range" min="1" max="10" className='w-full border px-3 py-2 rounded' id='level' {...register("level")}/>
            {errors.level && <span className="text-red-500 text-sm">{errors.level.message}</span>}
        </div>

      
        <div className='flex-1 flex-col'>
            <label htmlFor="git" className='block font-medium mb-1'>Category</label>
            <input type="text" placeholder='Enter Category' className='w-full border px-3 py-2 rounded' id='git' {...register("category")}/>
            {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>
       </div>

        <Button type="submit" disabled={isSubmitting} >
            {isSubmitting ? 'Submitting...' : `${type} Skill`}
        </Button>
    </form>
  )
}

export default SkillForm
