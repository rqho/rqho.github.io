import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link
        href="/"
        className="text-sm font-mono text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        Richard Ho
      </Link>
      <nav className="flex items-center gap-6">
        <Link 
          href="/projects" 
          className="text-sm font-mono text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          Projects
        </Link>
        <Link 
          href="/blog" 
          className="text-sm font-mono text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          Blog
        </Link>
      </nav>
    </header>
  )
}
