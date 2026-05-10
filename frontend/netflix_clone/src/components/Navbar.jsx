import React from 'react';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className='bg-black text-white flex justify-between items-center p-4 h-20 text-sm md:text-[16px] font-medium text-nowrap'>
        <img src="/logo.png" alt="Netflix Logo" className='w-[100px] h-[50px] md:w-[120px] md:h-[80] cursor-pointer shrink-0 brightness-125'/>
        {/* Browse by drop down */}
        <ul className='hidden xl:flex space-x-6'>
            <li className='font-light text-sm cursor-pointer hover:text-gray-300'>Home</li>
            <li className='font-light text-sm cursor-pointer hover:text-gray-300'>Shows</li>
            <li className='font-light text-sm cursor-pointer hover:text-gray-300'>Movies</li>
            <li className='font-light text-sm cursor-pointer hover:text-gray-300'>Games</li>
            <li className='font-light text-sm cursor-pointer hover:text-gray-300'>New & Popular</li>
            <li className='font-light text-sm cursor-pointer hover:text-gray-300'>My List</li>
            <li className='font-light text-sm cursor-pointer hover:text-gray-300'>Browse by Languages</li>
        </ul>
        <div className='flex items-center space-x-4 relative'>
            {/* search bar */}
            <div className="relative hidden md:inline-flex">
                <input type="text" className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none" placeholder='Titles, people, genres'/>

                <Search className="absolute top-2 right-4 w-5 h-5"/>
            </div>

            <button className='bg-[#e50914] px-5 py-2 text-white cursor-pointer'>Get AI Movie Picks</button>
            <button className='border border-[#333333] px-5 py-2 text-white cursor-pointer'>Sign In</button>

        </div>

    </nav>
  )
}

export default Navbar;