import { getPosts, getCategoryBySlug } from '@/features/payload/lib/queries'
import { BlogTabs } from '@/features/blog/components/blog-tabs'
import { BlogSearch } from '@/features/blog/components/blog-search'
import { BlogPostsClient } from '@/features/blog/components/blog-posts-client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Blog',
  description: 'Browse my portfolio projects',
}

interface ProjectsPageProps {
  searchParams: Promise<{ page?: string; q?: string }>
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { page, q } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const limit = 10
  const query = q || ''

  // Get the PROJECTS category
  const projectsCategory = await getCategoryBySlug('projects')
  
  // Получаем все посты для тегов и фильтрации
  const allPosts = await getPosts({ page: 1, limit: 1000, category: projectsCategory?.id ? String(projectsCategory.id) : undefined, search: query || undefined })
  
  // Получаем посты для текущей страницы (для пагинации без фильтров)
  const paginatedPosts = await getPosts({ page: currentPage, limit, category: projectsCategory?.id ? String(projectsCategory.id) : undefined, search: query || undefined })

  if (!allPosts || !paginatedPosts) {
    notFound()
  }

  const totalPages = Math.ceil(paginatedPosts.totalDocs / limit)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          {query ? 'Search Results' : 'Projects'}
        </h1>
        <p className="text-muted-foreground">
          {query 
            ? `Found ${paginatedPosts.totalDocs} result${paginatedPosts.totalDocs !== 1 ? 's' : ''} for "${query}" in Projects`
            : 'Browse my portfolio projects'
          }
        </p>
      </div>

      <BlogSearch />

      <BlogTabs />

      <BlogPostsClient
        allPosts={allPosts.docs}
        paginatedPosts={paginatedPosts.docs}
        currentPage={paginatedPosts.page ?? 1}
        totalPages={totalPages}
        hasNextPage={paginatedPosts.hasNextPage}
        hasPrevPage={paginatedPosts.hasPrevPage}
      />
    </div>
  )
}
