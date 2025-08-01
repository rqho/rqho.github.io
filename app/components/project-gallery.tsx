import Link from 'next/link'
import { formatDate, getProjects } from '../projects/utils'

export function ProjectGallery() {
  let allProjects = getProjects()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {allProjects
        .sort((a, b) => {
          // Sort by featured first, then by date
          if (a.metadata.featured && !b.metadata.featured) return -1
          if (!a.metadata.featured && b.metadata.featured) return 1
          
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  const { metadata, slug } = project

  return (
    <div className="group relative flex flex-col h-full border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50 hover:bg-neutral-900 transition-all duration-300 hover:border-neutral-700">
      <Link href={`/projects/${slug}`} className="flex flex-col flex-grow">
        {/* Project Image */}
        {metadata.image && (
          <div className="aspect-video bg-neutral-800 overflow-hidden">
            <img
              src={metadata.image}
              alt={metadata.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        {/* Project Content */}
        <div className="flex flex-col flex-grow p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-neutral-100 group-hover:text-white transition-colors">
                {metadata.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {formatDate(metadata.publishedAt)}
              </p>
            </div>
            {metadata.featured && (
              <span className="ml-2 px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-neutral-300 text-xs mb-4 flex-grow leading-relaxed">
            {metadata.summary}
          </p>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {metadata.techStack?.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {metadata.techStack?.length > 4 && (
                <span className="px-2 py-1 text-xs text-neutral-400">
                  +{metadata.techStack.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              metadata.status === 'completed' 
                ? 'bg-green-500/20 text-green-400'
                : metadata.status === 'in-progress'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-neutral-500/20 text-neutral-400'
            }`}>
              {metadata.status === 'completed' && '✓ Completed'}
              {metadata.status === 'in-progress' && '⚡ In Progress'}
              {metadata.status === 'archived' && '📦 Archived'}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Horizontal divider with proper margins */}
      <div className="border-t border-neutral-800 mx-6"></div>
      
      {/* Links - aligned with content */}
      <div className="flex gap-3 px-6 py-3">
        {metadata.githubUrl && (
          <a
            href={metadata.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            GitHub ↗
          </a>
        )}
        {metadata.demoUrl && (
          <a
            href={metadata.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Demo ↗
          </a>
        )}
      </div>
    </div>
  )
} 