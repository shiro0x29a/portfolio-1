'use client'

import Link from 'next/link'
import type { Post } from '@/features/payload/lib/types'
import { ProjectCardDreamy } from '../ui/project-card'
import { motion } from 'framer-motion'
import styles from './styles/projects-section.module.css'

interface RecentProjectsProps {
  projects: Post[]
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  // Анимация для заголовков (translateY + fade)
  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // Анимация для карточек (scale + translateY + fade)
  const revealScaleVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    <div id="projects" className={styles.section}>
      <div className={styles.header}>
        <motion.p 
          className={`text-muted-foreground ${styles.label}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealVariants}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="bg-muted-foreground w-8 h-[1px]"></span>
          What I've Built
        </motion.p>
        
        <motion.h2 
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealVariants}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          Featured Projects
        </motion.h2>
        
        <motion.p 
          className={`text-muted-foreground ${styles.description}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={revealVariants}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          A selection of projects I'm proud of — each solving a real problem with clean, production-ready code.
        </motion.p>
      </div>

      <div className={styles.grid}>
        {projects.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={revealScaleVariants}
            transition={{ 
              duration: 0.6, 
              delay: 0.15 * (index + 1),
              ease: 'easeOut' 
            }}
          >
            <ProjectCardDreamy
              project={project}
              index={index}
            />
          </motion.div>
        ))}
      </div>

      <motion.div 
        className={styles.buttonWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={revealVariants}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        <Link
          href="/blog/projects"
          className={`bg-muted text-primary ${styles.viewAllButton}`}
        >
          View all projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </div>
  )
}
