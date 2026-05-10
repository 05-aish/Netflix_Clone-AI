import React, { useEffect, useState } from 'react';
import HeroBg from '../assets/herobg2.jpg';
import { Play } from 'lucide-react';
import { Info } from 'lucide-react';

const hero = () => {
  const [movie, setMovie] =  useState(null);
  const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I4NzY1YmI3NjhmNDk2NzYxZjIyNDNmMWU0NmFhOCIsIm5iZiI6MTc3ODQzOTExNi41NTksInN1YiI6IjZhMDBkM2NjNzU4NmZhYzAwN2VjMjNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a_cYW1DYqE248Sf96CMGSoo2kncU8yrI2cn7CKizFRs'
    }
  };

  useEffect(()=> {
      fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => {
        if(res.results && res.results.length > 0){
          const randomIdx = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIdx]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if(!movie){
    return <p>Loading...</p>
  }

  return (
    <div className="text-white relative">
      <img 
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
        alt="bg-img" 
        className='w-full h-[480px] object-cover '/>

      <div className='flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium'>

        <button className="flex justify-center space-x-1 items-center bg-white hover:opacity-70 font-bold text-black px-5 py-3 rounded-md">
          <Play className='mr-2 h-5 fill-black'/>Play
        </button>

        <button className="flex justify-center bg-white/40 items-center opacity hover:opacity-80 text-sm font-bold text-white px-5 py-3 rounded-md">
          <Info className='mr-2 h-5 '/>More Info
        </button>
        
      </div>
    </div>
  )
}

export default hero;