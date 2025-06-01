import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href="/" className="hidden lg:flex">
      <Image src="/library_logo.png" width={160} height={120} alt="library logo" />
    </Link>

  );
}

export default Logo