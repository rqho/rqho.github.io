type Project = {
  name: string
  description: string
  link: string
  media: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  date: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Morphable Drone',
    description:
      'A quadrotor with omnidirectional flight capabilities.',
    link: 'https://iral-morphable.github.io/',
    media:
      '/projects/morphable-drone/morphable.mp4',
    id: 'project1',
  },
  {
    name: 'Imaging CubeSat',
    description: 'A 2U CubeSat for detecting and counting LEDs in the dark.',
    link: 'https://github.com/rqho/SNAC-SAT',
    media: '/projects/imaging-cubesat/image.png',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Intelligent Robotics and Autonomy Lab',
    title: 'Research Assistant',
    start: 'May 2025',
    end: 'Present',
    link: 'https://',
    id: 'work1',
  },
  {
    company: 'Michigan Aeronautical Science Association',
    title: 'Avionics Project Lead',
    start: 'Sep 2024',
    end: 'Present',
    link: 'https://masa.engin.umich.edu/',
    id: 'work2',
  },
  {
    company: 'QuantUM',
    title: 'Projects Director',
    start: 'Sep 2024',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Plans for 2026',
    date: 'January 1, 2026',
    link: '/blog/plans-for-2026',
    uid: 'blog-1',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    link: 'https://github.com/rqho',
  },
  {
    label: 'X/Twitter',
    link: 'https://x.com/richardlqho',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/rqho',
  }
]

export const EMAIL = 'rqho@umich.edu'
