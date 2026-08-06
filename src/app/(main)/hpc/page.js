export default function HPCPage() {
  const specs = [
    { name: 'Computing Nodes', value: '56', description: 'High-performance compute nodes' },
    { name: 'Total Cores', value: '1,000+', description: 'Processing cores available' },
    { name: 'Memory', value: '10+ TB', description: 'Combined RAM capacity' },
    { name: 'Storage', value: '500+ TB', description: 'High-speed storage' },
  ]

  const capabilities = [
    {
      name: 'Genomic Analysis',
      description: 'Process large-scale genomic datasets for population studies and disease research',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
    },
    {
      name: 'AI & Machine Learning',
      description: 'Train complex AI models for healthcare predictions and data analysis',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
    },
    {
      name: 'Molecular Simulations',
      description: 'Run computational chemistry and drug discovery simulations',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
    },
    {
      name: 'Big Data Analytics',
      description: 'Analyze massive healthcare and research datasets efficiently',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-red-900 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              High Performance Computing Cluster
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              State-of-the-art computational infrastructure powering groundbreaking research 
              in bioinformatics, genomics, and data science
            </p>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cluster Specifications
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Enterprise-grade computing infrastructure for advanced research
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((spec) => (
            <div
              key={spec.name}
              className="flex flex-col items-center justify-center gap-y-2 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8"
            >
              <dt className="text-base leading-7 text-gray-600">{spec.name}</dt>
              <dd className="text-5xl font-bold tracking-tight text-red-700">
                {spec.value}
              </dd>
              <p className="text-sm text-gray-600 text-center mt-2">
                {spec.description}
              </p>
            </div>
          ))}
        </dl>
      </div>

      {/* Capabilities */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Research Capabilities
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Supporting diverse computational research needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {capabilities.map((capability) => (
              <div
                key={capability.name}
                className="relative flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-red-700 text-white">
                  {capability.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {capability.name}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Access Information */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
            Access the HPC Cluster
          </h2>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              The ACE HPC cluster is available to researchers, students, and collaborators 
              working on projects aligned with our mission. Access is provided based on 
              project requirements and resource availability.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Who Can Access
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="h-6 w-6 flex-none text-red-700 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ACE students and researchers
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 flex-none text-red-700 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Collaborating institutions and partners
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 flex-none text-red-700 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                External researchers through approved projects
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Request Access
            </h3>
            <p className="text-gray-600 mb-6">
              To request access to the HPC cluster, please submit a project proposal 
              outlining your computational needs, research objectives, and expected outcomes.
            </p>

            <a
              href="/contact"
              className="inline-block rounded-md bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-600 transition-colors"
            >
              Request HPC Access
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}