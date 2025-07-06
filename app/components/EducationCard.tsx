"use client"
import { FrontEndEducation } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cardHover, fadeIn, fadeInUp } from '@/lib/animations'

const EducationCard = ({data}: {data: FrontEndEducation}) => {
  return (
    <motion.section
        {...fadeIn}
        transition={{ delay: 0.2 }}>
       <div className="group w-full h-64 perspective">
            <div className="relative w-full h-full transition-all transform-style-preserve-3d group-hover:rotate-y-180 ease-in-out delay-150 duration-700">
    
                {/* Front (Image) */}
                <div className="absolute w-full h-full backface-hidden">
                    <Image
                        src={data.image}
                        alt={data.school}
                        height={300}
                        width={300}
                        className="w-full h-full object-contain rounded-lg bg-white"
                        priority={true}
                    />
                </div>

                {/* Back (Text) */}
                <motion.div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-md bg-red-600">
                    <Card className='h-full'>
                        <CardHeader className='overflow-x-clip mx-2 my-0 p-0'>
                            <div className="flex max-w-sm justify-start items-center gap-3">
                                <Image className="size-8 rounded-full animate-bounce" src={data.image} alt={data.degree} width={25} height={25}/>
                                <div className='flex flex-col overflow-hidden'>
                                    <div className="overflow-hidden flex gap-2">
                                        <p className="font-medium truncate text-ellipsis">{data.degree}</p>
                                        <p className='text-ellipsis'>{data.year}</p>
                                    </div>
                                     <CardDescription className='text-start overflow-hidden'>
                                        <p className='truncate'>{data.school}</p>
                                    </CardDescription> 
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className='m-0 p-0 px-5 overflow-y-scroll scrollbar-hide-hover'>
                            <p className='text-center font-semibold shadow-lg'>Knowledge</p>
                           <motion.ul className=''
                                variants={fadeInUp}
                                 {...cardHover}>
                             {data.knowledge.map((knw, index)=> (
                                <motion.li key={index} className='text-xs list-none'
                                whileHover={{x: 10}}
                                transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {knw}
                                </motion.li>
                            ))}
                           </motion.ul>
                        </CardContent>
                    </Card>
                </motion.div>

            </div>
        </div>
    </motion.section>
  )
}

export default EducationCard
