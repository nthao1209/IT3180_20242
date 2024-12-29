import Link from 'next/link'
import React from 'react'

function UnauthorizedPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">401</h1>
        <p className="mt-4 text-xl text-gray-700">Unauthorized Access</p>
        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>
        <Link href="/" className="mt-6 inline-block rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
            Take me home
        </Link>
      </div>
    </div>
  )
}

export default UnauthorizedPage