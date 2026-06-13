'use client'

import Link from 'next/link'
import type { Post } from '@/features/payload/lib/types'
import { useEffect, useRef, useState } from 'react'
import { ProjectCard } from '../ui/project-card'
import { ProjectCardDream } from '../ui/project-card'
import { ProjectCardDreamy } from '../ui/project-card'
import styles from './styles/projects-section.module.css'

interface RecentProjectsProps {
  projects: Post[]
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('[data-project-card]')
    cards.forEach((card) => {
      if (observerRef.current) {
        observerRef.current.observe(card)
      }
    })
  }, [projects])

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <p className={`text-muted-foreground ${styles.label}`}>
          <span className="bg-muted-foreground w-8 h-[1px]"></span>
          What I've Built
        </p>
        <h2 className={styles.title}>Featured Projects</h2>
        <p className={`text-muted-foreground ${styles.description}`}>A selection of projects I'm proud of — each solving a real problem with clean, production-ready code.</p>
      </div>

      <div className={styles.grid}>
        {projects.slice(0, 3).map((project, index) => {
          const isVisible = visibleCards.has(`project-${project.id}`)

          return (
            <ProjectCardDreamy
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          )
        })}
      </div>

      <div className={styles.buttonWrapper}>
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
