import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Play } from 'lucide-react';

const Moviepage = () => {
  const [ movie, setMovie  ] = useState(null);
  const { id } = useParams();
  const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I4NzY1YmI3NjhmNDk2NzYxZjIyNDNmMWU0NmFhOCIsIm5iZiI6MTc3ODQzOTExNi41NTksInN1YiI6IjZhMDBkM2NjNzU4NmZhYzAwN2VjMjNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a_cYW1DYqE248Sf96CMGSoo2kncU8yrI2cn7CKizFRs'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then(res => res.json())
    .then(res => setMovie(res))
    .catch(err => console.error(err));
  }, [id]);

  if(!movie) {
    return <p className="flex items-center justify-center h-screen text-white
    text-lg">Loading...</p>
  }

  return (
    <div className='min-h-screen text-white'>
      <div 
        className='relative h-[60vh] flex' 
        style={{ backgroundImage: movie.backdrop_path ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : 'none',
        backgroundSize: "cover",
        backgroundPosition: "center" 
        }}>

        <div className='absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent'/>

        <div className='relative z-10 flex items-end p-8 gap-8'>
          <img 
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt='poster'
            className='rounded-lg shadow-lg w-48 h-72 object-cover' />

            <div>

              <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
              <div className='flex mb-2 space-x-2 items-center '>
                <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                <span>{movie.release_date}</span>
                <span>{movie.runtime} min</span>
              </div>

              <div className='flex flex-wrap mb-2 gap-2'>
              {movie.genres.map((genre) => (
                <span key={genre.id} className='bg-gray-800 px-3 py-1 rounded-full text-sm'>
                  {genre.name}
                </span>
              ))}
              </div>

              <p className='text-gray-200 max-w-2xl'>{movie.overview}</p>
              
              <button className="flex justify-center space-x-1 items-center bg-white hover:opacity-70 font-bold text-black mt-2 md:mt-4 px-5 py-3 rounded-md">
                <Play className='mr-2 h-5 fill-black'/>Watch Now
              </button>
            </div>
        </div>
      </div>
      <div className='p-8'>
              <h2 className='text-2xl font-semibold mb-4'>Details</h2>
              <div className='bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8'>
                <div className="flex-1">
                  <ul className='text-gray-300 space-y-3' >
                    <li>
                      <span className='font-semibold text-white'>Status: </span>
                      <span className='ml-2'>{movie.status}</span>
                    </li>

                    <li>
                      <span className='font-semibold text-white'>Release Date: </span>
                      <span className='ml-2'>{movie.release_date}</span>
                    </li>
                  </ul>
                </div>
              </div>
      </div>
    </div>
  );
}

export default Moviepage;