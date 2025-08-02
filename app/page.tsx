import { BlogPosts } from './components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi. I'm Richard.
      </h1>
      <p className="mb-4">
        {`I'm studying Electrical Engineering and Computer Science the University of Michigan with interests in quantum computing, computer architecture, and microwave/RF engineering.`}
      </p>
      <p className="mb-4">
        {`I'm currently a researcher at the Intelligent Robotics and Autonomy Lab, where I'm working on simulations of collaborative multi-robot systems. I'm also an avionics engineer for the Michigan Aeronautical Science Association and a member of the Quantum Computing Club.`}
      </p>
      <p className="mb-4">
        {`I was born in NYC and I currently reside in the Brainy Borough of Metuchen, New Jersey.`}
      </p>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
