'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/features/payload/lib/types'
import { useEffect, useRef, useState } from 'react'

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
    <div className="mb-12">
      <div className="text-center">
        <p className="mb-3.5 text-[0.78rem] font-normal text-muted-foreground tracking-[0.25em] uppercase flex items-center justify-center gap-2.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <span className="w-8 h-[1px] bg-muted-foreground"></span>
          What I've Built
        </p>
        <h2 className="inline-block font-extrabold leading-[1.1] mb-5 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>Featured Projects</h2>
        <p className="text-muted-foreground mb-6 leading-[1.7] mx-auto" style={{ maxWidth: '520px' }}>A selection of projects I'm proud of — each solving a real problem with clean, production-ready code.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              className={`group relative bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {coverImage && (
                <div className="relative h-[11.25rem]">
                  <Image
                    src={coverImage.sizes?.large?.url || coverImage.url || ''}
                    alt={coverImage.alt || project.title}
                    fill
                    className="object-cover grayscale brightness-110 group-hover:grayscale group-hover:invert group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              )}

              <div className="h-[16.875rem]" style={{ padding: '22px' }}>
                <div className="text-muted-foreground mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.15em' }}>
                  {String(index + 1).padStart(2, '0')} / 03
                </div>
                <h3 className="font-bold mb-2.5 line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem' }}>
                  {project.title}
                </h3>

                {project.excerpt && (
                  <p className="text-muted-foreground line-clamp-4 mb-4" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>
                    {project.excerpt}
                  </p>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block text-xs rounded-full bg-secondary text-secondary-foreground"
                        style={{ padding: '4px 11px' }}
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

      <div className="flex justify-center">
        <Link
          href="/blog/projects"
          className="inline-flex items-center gap-2 px-6 py-2 mt-4 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/70 transition-colors shadow-sm hover:shadow-md"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
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
