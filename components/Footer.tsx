import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer className='h-fit flex flex-col md:flex-row justify-between w-full items-center gap-5 md:items-end px-4 md:px-12 py-12 border-t'>
        <Image
            src="/oa_vertical.svg"
            alt="Logo"
            width={200}
            height={200}
        />
        <p className='text-gray-400 text-center md:text-right'>Copyright © 2024 - Omni Attention Tech Team</p>
    </footer>
  )
}
