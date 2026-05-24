import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../stores/authStore';
import { HelpCircle, Settings, LogOut, UsersRound } from 'lucide-react';
import { toast } from "react-hot-toast";

const TMDB_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I4NzY1YmI3NjhmNDk2NzYxZjIyNDNmMWU0NmFhOCIsIm5iZiI6MTc3ODQzOTExNi41NTksInN1YiI6IjZhMDBkM2NjNzU4NmZhYzAwN2VjMjNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a_cYW1DYqE248Sf96CMGSoo2kncU8yrI2cn7CKizFRs'
  }
};

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // debounce + fetch search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`, TMDB_OPTIONS)
        .then(res => res.json())
        .then(data => {
          setResults(data.results?.slice(0, 6) || []);
          setShowDropdown(true);
        })
        .catch(err => console.error(err));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (movieId) => {
    setShowDropdown(false);
    setSearchQuery('');
    navigate(`/movie/${movieId}`);
  };

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
    setShowMenu(false);
  };

  return (
    <nav className='bg-black text-white flex justify-between items-center p-4 h-20 text-sm md:text-[16px] font-medium text-nowrap'>
      <Link to={"/"}>
        <img src="/logo.png" alt="Netflix Logo" className='w-[100px] h-[50px] md:w-[120px] md:h-[80] cursor-pointer shrink-0 brightness-125' />
      </Link>

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
        <div className="relative hidden md:inline-flex" ref={searchRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
            placeholder='Titles, people, genres'
          />
          <Search
            className="absolute top-2 right-4 w-5 h-5 cursor-pointer hover:text-gray-300"
            onClick={() => {
              if (searchQuery.trim()) {
                fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`, TMDB_OPTIONS)
                  .then(res => res.json())
                  .then(data => {
                    setResults(data.results?.slice(0, 6) || []);
                    setShowDropdown(true);
                  });
              }
            }}
          />

          {/* dropdown results */}
          {showDropdown && results.length > 0 && (
            <div className='absolute top-12 left-0 w-full bg-[#141414] border border-[#333333] rounded-lg overflow-hidden z-50 shadow-xl'>
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleResultClick(movie.id)}
                  className='flex items-center gap-3 px-3 py-2 hover:bg-[#222222] cursor-pointer transition'
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className='w-8 h-12 object-cover rounded'
                    />
                  ) : (
                    <div className='w-8 h-12 bg-[#333333] rounded flex items-center justify-center text-xs text-gray-500'>?</div>
                  )}
                  <div className='flex flex-col'>
                    <span className='text-sm text-white'>{movie.title}</span>
                    <span className='text-xs text-gray-400'>{movie.release_date?.split('-')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link to={"/ai-recommendations"}>
          <button className='bg-[#e50914] px-5 py-2 text-white cursor-pointer'>Get AI Movie Picks</button>
        </Link>

        {(!user) ?
          <Link to={"/signin"}>
            <button className='border border-[#333333] px-5 py-2 text-white cursor-pointer'>Sign In</button>
          </Link>
          :
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='relative border border-[#333333] px-5 py-2 h-10 text-sm text-white cursor-pointer'>{user?.username}
          </button>
        }

        {showMenu &&
          <div className='flex flex-col absolute mt-2 right-0 top-10 z-10 w-48 border border-[#333333] bg-[#141414]/50 rounded overflow-hidden gap-y-2 shadow-lg'>
            <span className='flex flex-row px-4 pt-4 text-sm hover:bg-[#222222]/50 transition'><UsersRound/>
              <div className='ml-3 flex flex-col'>
                <span>{user?.username}</span>
                <span className='text-xs text-gray-400'>{user?.email}</span>
              </div>
            </span>
            <span className='flex px-4 pt-4 text-sm hover:bg-[#222222]/50 transition gap-x-2'><Settings />Switch Profile</span>
            <span className='flex px-4 pt-4 text-sm hover:bg-[#222222]/50 transition gap-x-2'><HelpCircle />Help Center</span>
            <br />
            <button onClick={handleLogout} className='flex justify-center items-center px-4 pb-4 text-sm hover:bg-[#222222]/50 transition gap-x-2'><LogOut />Log out</button>
          </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;