'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/features/payload/lib/types'
import styles from './project-card-dream.module.css'

interface ProjectCardDreamProps {
  project: Post
  index: number
  isVisible: boolean
}

export function ProjectCardDream({ project, index, isVisible }: ProjectCardDreamProps) {
  const coverImage = typeof project.coverImage === 'object' ? project.coverImage : null
  const tags = Array.isArray(project.tags)
    ? project.tags.map(tag => typeof tag === 'object' ? tag : null).filter(Boolean)
    : []

  return (
    <>
      <svg version="1.1" className={styles.svgFilter}>
        <defs>
          <filter id="dreamFilter" colorInterpolation="sRGB" colorInterpolationFilters="sRGB">
            <feComponentTransfer result="srcRGB"></feComponentTransfer>
            <feColorMatrix 
              in="SourceGraphic" 
              type="matrix" 
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" 
              result="color"
            ></feColorMatrix>
            <feComponentTransfer in="color" result="flood_alpha">
              <feFuncA type="linear" slope="0.4"></feFuncA>
            </feComponentTransfer>
            <feGaussianBlur in="srcRGB" stdDeviation="1.6"></feGaussianBlur>
            <feComponentTransfer result="blur_alpha">
              <feFuncA type="linear" slope="0.5"></feFuncA>
            </feComponentTransfer>
            <feBlend in="blur_alpha" in2="srcRGB" mode="normal" result="source_blur"></feBlend>
            <feBlend in2="source_blur" in="flood_alpha" mode="overlay"></feBlend>
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.1"></feFuncR>
              <feFuncG type="linear" slope="1.1"></feFuncG>
              <feFuncB type="linear" slope="1.1"></feFuncB>
            </feComponentTransfer>
            <feComponentTransfer result="contrast">
              <feFuncR type="linear" slope="0.9" intercept="0.02"></feFuncR>
              <feFuncG type="linear" slope="0.9" intercept="0.02"></feFuncG>
              <feFuncB type="linear" slope="0.9" intercept="0.02"></feFuncB>
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="0.8"></feColorMatrix>
            <feComponentTransfer></feComponentTransfer>
          </filter>
        </defs>
      </svg>

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
    </>
  )
}
