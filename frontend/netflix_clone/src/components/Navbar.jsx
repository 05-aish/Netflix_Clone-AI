import React from 'react';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { HelpCircle, Settings, LogOut, UsersRound } from 'lucide-react';
import {toast} from "react-hot-toast";


const Navbar = () => {

  const {user, logout} = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  }

  return (
    <nav className='bg-black text-white flex justify-between items-center p-4 h-20 text-sm md:text-[16px] font-medium text-nowrap'>
        <Link to={"/"}>
            <img src="/logo.png" alt="Netflix Logo" className='w-[100px] h-[50px] md:w-[120px] md:h-[80] cursor-pointer shrink-0 brightness-125'/>
        </Link>
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
            
            {/* get ai movie picks button */}
            <Link to={"/ai-recommendations"}>
                <button className='bg-[#e50914] px-5 py-2 text-white cursor-pointer'>Get AI Movie Picks</button>
            </Link>

            {/* sign in button */}
            {(!user)? 
            <Link to={"/signin"}>
                <button className='border border-[#333333] px-5 py-2 text-white cursor-pointer'>Sign In</button>
            </Link>
            :
            <button 
            onClick={() => setShowMenu(!showMenu)}
            className='relative border border-[#333333] px-5 py-2 h-10 text-sm text-white cursor-pointer'>{user?.username}</button>
            }

            {showMenu && 
            
            <div className='flex flex-col absolute mt-2 right-0 top-10 z-10 w-48 border border-[#333333] bg-[#141414]/50 rounded overflow-hidden gap-y-2 shadow-lg'>

                <span className='flex flex-row px-4 pt-4 text-sm hover:bg-[#222222]/50 transition'><UsersRound/>
                    <div className='ml-3 flex flex-col'>
                    <span>{user?.username}</span>
                    <span className='text-xs text-gray-400 hover:bg-[#222222]/50 transition'>{user?.email}</span>
                    </div>
                </span>
                
                <span className='flex px-4 pt-4 text-sm hover:bg-[#222222]/50 transition gap-x-2'><Settings/>Switch Profile</span>
                <span className='flex px-4 pt-4 text-sm hover:bg-[#222222]/50 transition gap-x-2'><HelpCircle/>Help Center</span>
                <br/>
                <button onClick={handleLogout} className='flex justify-center items-center px-4 pb-4 text-sm hover:bg-[#222222]/50  transition gap-x-2'><LogOut/>Log out</button>

            </div>}
            
        </div>
    </nav>
  )
}

export default Navbar;