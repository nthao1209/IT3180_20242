import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
  <div>
    <Link href="/" >
      <div className="hidden lg:flex">
        <Image src="/library_logo.png" width={160} height={120} alt="library logo" />
      </div>
    </Link>
  </div>
  );
}

export default Logo
