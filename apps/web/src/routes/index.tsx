import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="relative isolate min-h-screen bg-white">
      {/* Background soft glow */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#60a5fa] to-[#93c5fd] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
            Nylon Drive.
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Your files, simplified.
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-slate-600">
          A high-performance personal drive. Zero bloat, end-to-end type safety, 
          and lightning-fast uploads.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/drive"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex items-center gap-2 transition-all"
          >
            Open My Drive <ArrowRight size={16} />
          </Link>
          <a href="#features" className="text-sm font-semibold leading-6 text-slate-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
