import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    PostHeader: ({
      title,
      date,
      description,
    }: {
      title: string
      date: string
      description: string
    }) => {
      return (
        <header className="not-prose mb-8">
          <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h1>
          <time className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400">
            {date}
          </time>
          <p className="mt-4 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>
        </header>
      )
    },
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure>
          <img src={src} alt={alt} className="rounded-xl" />
          <figcaption className="text-center">{caption}</figcaption>
        </figure>
      )
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
  }
}
