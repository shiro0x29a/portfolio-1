'use client'

import Link from 'next/link'
import type { Post } from '@/features/payload/lib/types'
import { ProjectCardDreamy } from '../ui/project-card'
import useInView from '@/shared/hooks/use-in-view'
import styles from './styles/projects-section.module.css'

interface RecentProjectsProps {
  projects: Post[]
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  const [ref, inView] = useInView()

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <div id="projects" className={styles.section} ref={ref}>
      <div className={styles.header}>
        <p className={`text-muted-foreground ${styles.label} ${styles.reveal} ${inView ? styles.visible : ''}`}>
          <span className="bg-muted-foreground w-8 h-[1px]"></span>
          What I've Built
        </p>
        <h2 className={`${styles.title} ${styles.reveal} ${styles.delay1} ${inView ? styles.visible : ''}`}>Featured Projects</h2>
        <p className={`text-muted-foreground ${styles.description} ${styles.reveal} ${styles.delay2} ${inView ? styles.visible : ''}`}>A selection of projects I'm proud of — each solving a real problem with clean, production-ready code.</p>
      </div>

      <div className={styles.grid}>
        {projects.slice(0, 3).map((project, index) => (
          <ProjectCardDreamy
            key={project.id}
            project={project}
            index={index}
            isVisible={inView}
            className={`${styles.revealScale} ${inView ? styles.visible : ''} ${styles[`delay${index + 1}`]}`}
            // className={`${styles.revealScale} ${inView ? styles.visible : ''}`}
            // style={{ transitionDelay: `${0.15 * (index + 1)}s` }}
          />
        ))}
      </div>

      <div className={`${styles.buttonWrapper} ${styles.reveal} ${styles.delay4} ${inView ? styles.visible : ''}`}>
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
      </div>
    </div>
  )
}
