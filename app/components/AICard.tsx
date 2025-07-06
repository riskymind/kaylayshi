"use client"
import { FrontEndSkill } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const AICard = ({skill}: {skill: FrontEndSkill}) => {
  return (
    <motion.div className='flex justify-start gap-2 items-center'
    whileHover={{x: 10}}
    transition={{ type: "spring", stiffness: 300 }}
    >
      <Image src={skill.image} alt={skill.title} width={30} height={30}/>
      {skill.title}
    </motion.div>
  )
}

export default AICard
