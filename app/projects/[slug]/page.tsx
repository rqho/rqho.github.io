import { notFound } from 'next/navigation'
import { CustomMDX } from '../../components/mdx'
import { formatDate, getProjects } from '../utils'
import { baseUrl } from '../../sitemap'

export async function generateStaticParams() {
  let projects = getProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let project = getProjects().find((project) => project.slug === slug)
  if (!project) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = project.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/projects/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let project = getProjects().find((project) => project.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: project.metadata.title,
            datePublished: project.metadata.publishedAt,
            dateModified: project.metadata.publishedAt,
            description: project.metadata.summary,
            image: project.metadata.image
              ? project.metadata.image
              : `${baseUrl}/og?title=${encodeURIComponent(
                  project.metadata.title
                )}`,
            url: `${baseUrl}/projects/${project.slug}`,
            author: {
              '@type': 'Person',
              name: 'Richard Ho',
            },
          }),
        }}
      />
      
      {/* Project Header */}
      <div className="mb-8">
        <h1 className="title font-semibold text-2xl tracking-tighter mb-4">
          {project.metadata.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <time dateTime={project.metadata.publishedAt}>
              {formatDate(project.metadata.publishedAt)}
            </time>
            <span className={`px-2 py-1 text-xs rounded-full ${
              project.metadata.status === 'completed' 
                ? 'bg-green-500/20 text-green-400'
                : project.metadata.status === 'in-progress'
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-neutral-500/20 text-neutral-400'
            }`}>
              {project.metadata.status === 'completed' && '✓ Completed'}
              {project.metadata.status === 'in-progress' && '⚡ In Progress'}
              {project.metadata.status === 'archived' && '📦 Archived'}
            </span>
          </div>
          
          {project.metadata.featured && (
            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
              Featured Project
            </span>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-300 mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {project.metadata.techStack?.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm bg-neutral-800 text-neutral-300 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-8">
          {project.metadata.githubUrl && (
            <a
              href={project.metadata.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-md transition-colors text-sm"
            >
              GitHub ↗
            </a>
          )}
          {project.metadata.demoUrl && (
            <a
              href={project.metadata.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
            >
              Live Demo ↗
            </a>
          )}
        </div>

        {/* Project Image */}
        {project.metadata.image && (
          <div className="mb-8">
            <img
              src={project.metadata.image}
              alt={project.metadata.title}
              className="w-full h-64 object-cover rounded-lg border border-neutral-800"
            />
          </div>
        )}
      </div>

      {/* Project Content */}
      <article className="prose prose-invert max-w-none">
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
} 