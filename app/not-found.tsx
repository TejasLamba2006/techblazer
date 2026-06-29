import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-bold uppercase tracking-tight text-on-dark">
        404
      </h1>
      <p className="mb-8 max-w-[400px] font-light text-body">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="btn-primary-m">
        Return Home
      </Link>
    </div>
  )
}
