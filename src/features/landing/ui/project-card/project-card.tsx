'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/features/payload/lib/types'
import styles from './project-card.module.css'

interface ProjectCardProps {
  project: Post
  index: number
  isVisible: boolean
}

export function ProjectCard({ project, index, isVisible }: ProjectCardProps) {
  const coverImage = typeof project.coverImage === 'object' ? project.coverImage : null
  const tags = Array.isArray(project.tags)
    ? project.tags.map(tag => typeof tag === 'object' ? tag : null).filter(Boolean)
    : []

  return (
    <Link
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
}
