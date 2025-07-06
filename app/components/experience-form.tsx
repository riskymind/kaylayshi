"use client"
import React, { useEffect, useState } from 'react'
import { UploadButton } from '@/lib/uploadthing';
import {Experience} from  "@/types/index"
import { useRouter } from 'next/navigation';
import {insertExperienceSchema, updateExperienceSchema} from "@/lib/validators"
import {z} from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {expDefaultValues} from "@/lib/constants"
import {toast} from "sonner"
import Image from 'next/image';
import {createExperience, updateExperience} from "@/lib/actions/experience.actions"
import { Button } from '@/components/ui/button';


const ExpForm = ({
    type,
    exp,
    expId
}: {
    type: "Create" | "Update"
    exp?: Experience
    expId?: string
}) => {

const router = useRouter()

const schema = type === 'Update' ? updateExperienceSchema : insertExperienceSchema;
type ExpFormSchema = z.infer<typeof schema>;


const form = useForm<ExpFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: exp && type === 'Update' ? exp : expDefaultValues,
  });


const [dutyInput, setDutyInput] = useState('');
const [duties, setDuties] = useState<string[]>(exp?.duties || []);

useEffect(() => {
  setValue('duties', duties);
})


 const onSubmit = async (values: ExpFormSchema) => {
    if (type === 'Create') {
      const res = await createExperience(values);
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      router.push('/admin/experience');
    }

    if (type === 'Update') {
      if (!expId) return router.push('/admin/experience');
      const res = await updateExperience({ ...values, id: expId });
      if (!res.success) return toast.error(res.message);
      toast.success(res.message);
      router.push('/admin/experience');
    }
  };

   const { register, handleSubmit, setValue, watch, formState: { isSubmitting, errors } } = form;

  const image = watch('image');

  return (
    <form className='flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
            <label htmlFor="role" className='block font-medium mb-1'>Role</label>
            <input type="text" placeholder='Enter Experience Role' 
            className='w-full border px-3 py-2 rounded' id='role' {...register("role")}/>
            {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
        </div>
        
        <div className='flex flex-col'>
            <label htmlFor="company" className='block font-medium mb-1'>Company</label>
            <input type='text' id="company" placeholder='Enter Company' className='w-full border px-3 py-2 rounded' {...register("company")}/>
            {errors.company && <span className="text-red-500 text-sm">{errors.company.message}</span>}
        </div>

         <div className='flex flex-col'>
            <label htmlFor="loc" className='block font-medium mb-1'>Location</label>
            <input type='text' id="loc" placeholder='Enter Location' className='w-full border px-3 py-2 rounded' {...register("location")}/>
            {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
        </div>
        
        <div className='flex flex-col gap-1'>
            <label className="block font-medium mb-1">Images</label>
            <div className="flex gap-4 items-center">
            <Image  src={image} alt="logo" width={100} height={100} className="rounded" />
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

      <div className='flex gap-2'>
          <div className='flex-1 flex-col'>
            <label htmlFor="date" className='block font-medium mb-1'>Start Date</label>
            <input type="date" className='w-full border px-3 py-2 rounded' id='date' {...register("startDate")}/>
            {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate.message}</span>}
        </div>
        <div className='flex-1 flex-col'>
            <label htmlFor="e-date" className='block font-medium mb-1'>End Date</label>
            <input type="date" className='w-full border px-3 py-2 rounded' id='e-date' {...register("endDate")}/>
            {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate.message}</span>}
        </div>
      </div>

       <div className='flex flex-col gap-2'>
            <label htmlFor="tech" className='block font-medium mb-1'>Duties</label>
            <div className="flex flex-wrap gap-2">
                {duties.map((duty, index) => (
                <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex-col items-center gap-1 text-sm"
                >
                    {duty}
                    <button
                    type="button"
                    onClick={() =>
                        setDuties(duties.filter((_, i) => i !== index))
                    }
                    className="text-blue-500 hover:text-red-500"
                    >
                    ✕
                    </button>
                </span>
                ))}
            </div>
            <div className='flex gap-2'>
                <input type="text"  className="border border-gray-300 rounded px-3 py-2 w-full" placeholder="Type a duty and press Enter"
                value={dutyInput}
                onChange={(e) => setDutyInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && dutyInput.trim()) {
                    e.preventDefault();
                    if (!duties.includes(dutyInput.trim())) {
                        setDuties([...duties, dutyInput.trim()]);
                        setDutyInput('');
                    }
                    }
                }}/>
            </div>
        </div>

        <div>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'
          >
            {isSubmitting ? 'Submitting...' : `${type} Experience`}
          </Button>
        </div>
    </form>
  )
}

export default ExpForm
