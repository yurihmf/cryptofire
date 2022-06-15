import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-title'>
      <div className='transition-all delay-75 ease-in-out container mx-auto flex justify-center items-center md:justify-between text-white'>
        <Link href='/'>
          <span className='text-xl text-main py-3 font-nunito cursor-pointer'>❤️‍🔥 CryptoFire</span>
        </Link>
      </div>
    </header>
  )
}

export default Header