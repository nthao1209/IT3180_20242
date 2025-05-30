import React from 'react'

function AuthLayout({
    children
}: { children: React.ReactNode}) {
  return (
    <div className="container mx-auto mt-32 max-w-md flex flex-col space-y-2 border border-slate-300 rounded-md p-8 shadow-md">
        {children}
    </div>
  )
}

export default AuthLayout