import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='bg-title'>
      <div className='transition-all delay-75 ease-in-out container mx-auto flex justify-around items-center md:justify-between text-white'>
        <Link href='/'>
          <span className='text-xl text-main py-3 font-nunito cursor-pointer'>❤️‍🔥 CryptoFire</span>
        </Link>
        <div className='flex gap-x-2 md:gap-x-4'>
          <Link href='https://github.com/yurihmf/cryptofire'>
            <span className='cursor-pointer transition-all delay-75 hover:scale-110'>
              <FaGithub color='#fff' size={25}/>
            </span>
          </Link>
          <Link href='https://www.linkedin.com/in/yuri-homen-de-mello-ferreira-b04232191/'>
            <span className='cursor-pointer transition-all delay-75 hover:scale-110'>
              <FaLinkedin color='#fff' size={25} />
            </span>
          </Link>
          </div>
      </div>
    </header>
  )
}

export default Header