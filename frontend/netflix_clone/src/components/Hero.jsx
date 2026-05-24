import React, { useEffect, useState } from 'react';
import HeroBg from '../assets/herobg2.jpg';
import { Play } from 'lucide-react';
import { Info } from 'lucide-react';
import { Link } from 'react-router';

const hero = () => {
  const [movie, setMovie] =  useState(null);
  const [logo, setLogo] = useState(null);

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
          const picked = res.results[randomIdx];
          setMovie(picked);

          fetch(`https://api.themoviedb.org/3/movie/${picked.id}/images?include_image_language=en,null`, options)
          .then(r => r.json())
          .then(r => {
            if (r.logos && r.logos.length > 0) {
              setLogo(r.logos[0].file_path);
            }
          })
          .catch(err => console.error(err));
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

      <div className='absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent'></div>
        
      {/* movie logo */}
      <div className='absolute bottom-20 left-4 md:bottom-24 md:left-10'>
        {logo ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${logo}`}
            alt={movie.title}
            className='w-48 md:w-80 drop-shadow-2xl'
          />
        ) : (
          <h1 className='text-3xl md:text-5xl font-bold drop-shadow-lg'>{movie.title}</h1>
        )}
      </div>

      <div className='flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium'>

        <Link to={`/movie/${movie.id}`}>
          <button className="flex justify-center space-x-1 items-center bg-white hover:opacity-70 font-bold text-black px-5 py-3 rounded-md">
            <Play className='mr-2 h-5 fill-black'/>Play
          </button>
        </Link>

        <button className="flex justify-center bg-white/40 items-center opacity hover:opacity-80 text-sm font-bold text-white px-5 py-3 rounded-md">
          <Info className='mr-2 h-5 '/>More Info
        </button>
      </div>

    </div>
  )
}

export default hero;