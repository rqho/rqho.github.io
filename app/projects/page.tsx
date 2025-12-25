'use client'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import { TextScramble } from '@/components/ui/text-scramble'
import { PROJECTS } from '../data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectMediaProps = {
  src: string
}

function isImageUrl(url: string): boolean {
  return /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(url)
}

function ProjectMedia({ src }: ProjectMediaProps) {
  const isImage = isImageUrl(src)

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        {isImage ? (
          <img
            src={src}
            alt=""
            className="aspect-video w-full cursor-zoom-in rounded-xl object-contain bg-zinc-50 dark:bg-zinc-950"
          />
        ) : (
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video w-full cursor-zoom-in rounded-xl"
          />
        )}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          {isImage ? (
            <img
              src={src}
              alt=""
              className="max-h-[50vh] w-auto max-w-full rounded-xl object-contain bg-zinc-50 dark:bg-zinc-950 md:max-h-[70vh]"
            />
          ) : (
            <video
              src={src}
              autoPlay
              loop
              muted
              className="max-h-[50vh] w-auto max-w-full rounded-xl md:max-h-[70vh]"
            />
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default function ProjectsPage() {
  const [isTrigger, setIsTrigger] = useState(false)

  useEffect(() => {
    setIsTrigger(true)
  }, [])

  return (
    <motion.main
      className="space-y-16"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h1 className="mb-5 text-3xl font-medium text-black dark:text-white">
          <TextScramble
            as="span"
            speed={0.025}
            trigger={isTrigger}
            onScrambleComplete={() => setIsTrigger(false)}
          >
            Projects
          </TextScramble>
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectMedia src={project.media} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}

