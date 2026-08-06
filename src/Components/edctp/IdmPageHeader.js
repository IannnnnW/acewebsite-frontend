import Link from 'next/link'

export default function IdmPageHeader({ eyebrow, title, subtitle, breadcrumb }) {
  return (
    <div className="bg-idblue-900 pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>
      {/* Signature tri-color accent line, on every page header */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-idred-600 via-idblue-500 to-idblue-900" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {breadcrumb && (
          <nav className="flex items-center gap-2 text-idblue-300 text-xs mb-6">
            <Link href="/edctp-idm" className="hover:text-white">IDM Africa</Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {i === breadcrumb.length - 1 ? (
                  <span className="text-white">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white">{crumb.label}</Link>
                )}
              </span>
            ))}
          </nav>
        )}
        <p className="text-idblue-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">{eyebrow}</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl leading-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-idblue-200 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  )
}
