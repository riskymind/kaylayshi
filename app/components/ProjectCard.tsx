'use client'

import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { fadeInUp, cardHoverSmall } from '@/lib/animations'
import { FrontEndProject } from '@/types'


export default function ProjectCard({data}: {data: FrontEndProject}) {

  return (
    <section className="border-2 border-slate rounded-lg">
            <motion.article
              key={data.title}
              className="dark:bg-dark/50 rounded-lg shadow-md p-6"
              variants={fadeInUp}
              {...cardHoverSmall}
            >
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={data.images[0]}
                  alt={data.title}
                  height={300}
                  width={300}
                  className="w-full h-full object-contain rounded-lg bg-white"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <motion.h3 
                className="text-xl font-semibold mb-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {data.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {data.description}
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
              >
                {data.technologies.map((tech: string) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href={data.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="h-5 w-5  text-[#1C1C1C] dark:text-[#D4D4D4]" />
                  <span className='text-gray-500 dark:text-white'>Code</span>
                </motion.a>
                <motion.a
                  href={data.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="h-5 w-5 text-[#1C1C1C] dark:text-[#D4D4D4]" />
                  <span className='text-gray-500 dark:text-white'>Live Demo</span>
                </motion.a>
              </motion.div>
            </motion.article>
      
    </section>
  )
} 