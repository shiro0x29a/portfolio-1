import { HeroSection } from "@/features/landing";
import SkillsSection from "@/features/landing/components/skills-section";
import { RecentProjects } from "@/features/landing/components/projects-section";
import { getPosts, getCategoryBySlug } from "@/features/payload/lib/queries";

const Page = async () => {
  // Get projects category
  const projectsCategory = await getCategoryBySlug('projects');
  
  // Fetch recent projects (6 items)
  const projects = projectsCategory 
    ? await getPosts({ 
        page: 1, 
        limit: 6, 
        category: String(projectsCategory.id),
        sort: '-publishedAt'
      })
    : null;

  return (
    <div>
      <HeroSection />
      <SkillsSection />
      {projects && projects.docs.length > 0 && (
        <RecentProjects projects={projects.docs} />
      )}
    </div>
  );
};

export default Page;
