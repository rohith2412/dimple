import Link from 'next/link'
import React from 'react'

export const Mysettings = () => {
  return (
    <div>
        <Link href="/client/profile">
          <div className="border w-30 text-center p-1 text-sm rounded-md cursor-pointer">
            My Settings
          </div>
        </Link>
    </div>
  )
}
