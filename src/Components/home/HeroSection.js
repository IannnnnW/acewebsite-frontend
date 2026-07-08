import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-900">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-red-700/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            <span className="mr-2">🎓</span>
            Center of Excellence in Bioinformatics
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
            Welcome to ACE Uganda
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-red-100 sm:text-xl animate-fade-in">
            African Center of Excellence in Bioinformatics and Data Intensive Sciences
          </p>
          
          <p className="mt-4 text-base leading-7 text-red-200 max-w-2xl mx-auto animate-slide-up">
            Advancing health outcomes through innovative High-Performance Computing, 
            Bioinformatics, Visualization, and Data Science. Building capacity for the 
            next generation of African scientists.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
            <Link
              href="/programs"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-red-900 shadow-sm hover:bg-red-50 transition-all hover:scale-105"
            >
              Explore Programs
            </Link>
            <Link
              href="/research"
              className="rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-all hover:scale-105"
            >
              Our Research
            </Link>
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center animate-bounce">
            <svg
              className="h-6 w-6 text-red-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-red-400 to-red-300 opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}