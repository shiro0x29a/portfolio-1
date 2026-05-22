import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/features/payload/lib/types'

interface RecentProjectsProps {
  projects: Post[]
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Recent Projects</h2>
        <Link
          href="/blog/projects"
          className="text-primary hover:underline font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 6).map((project) => {
          const coverImage = typeof project.coverImage === 'object' ? project.coverImage : null
          const categories = Array.isArray(project.categories) 
            ? project.categories.map(cat => typeof cat === 'object' ? cat : null).filter(Boolean)
            : []
          const tags = Array.isArray(project.tags)
            ? project.tags.map(tag => typeof tag === 'object' ? tag : null).filter(Boolean)
            : []

          return (
            <Link
              key={project.id}
              href={`/blog/${project.slug}`}
              className="group relative bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
            >
              {coverImage && (
                <div className="relative aspect-video">
                  <Image
                    src={coverImage.sizes?.large?.url || coverImage.url || ''}
                    alt={coverImage.alt || project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {project.excerpt && (
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {project.excerpt}
                  </p>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
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
    </div>
  )
}
