'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/features/payload/lib/types'
import { useEffect, useRef, useState } from 'react'
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
          const coverImage = typeof project.coverImage === 'object' ? project.coverImage : null
          const categories = Array.isArray(project.categories) 
            ? project.categories.map(cat => typeof cat === 'object' ? cat : null).filter(Boolean)
            : []
          const tags = Array.isArray(project.tags)
            ? project.tags.map(tag => typeof tag === 'object' ? tag : null).filter(Boolean)
            : []
          
          const isVisible = visibleCards.has(`project-${project.id}`)

          return (
            <Link
              key={project.id}
              id={`project-${project.id}`}
              data-project-card
              href={`/blog/${project.slug}`}
              className={`group bg-card ${styles.projectCard} ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {coverImage && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={coverImage.sizes?.large?.url || coverImage.url || ''}
                    alt={coverImage.alt || project.title}
                    fill
                    className={styles.projectImage}
                  />
                </div>
              )}

              <div className={styles.cardContent}>
                <div className={`text-muted-foreground ${styles.projectNumber}`}>
                  {String(index + 1).padStart(2, '0')} / 03
                </div>
                <h3 className={styles.projectTitle}>
                  {project.title}
                </h3>

                {project.excerpt && (
                  <p className={`text-muted-foreground ${styles.projectExcerpt}`}>
                    {project.excerpt}
                  </p>
                )}

                {tags.length > 0 && (
                  <div className={styles.tagsWrapper}>
                    {tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className={`bg-secondary text-secondary-foreground ${styles.tag}`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
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
