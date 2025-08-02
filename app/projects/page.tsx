import { ProjectGallery } from '../components/project-gallery'

export const metadata = {
  title: 'Projects',
  description: 'Check out my projects and work.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <ProjectGallery />
    </section>
  )
} 