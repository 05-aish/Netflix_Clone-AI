import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Play } from 'lucide-react';


const Moviepage = () => {
  const [ movie, setMovie  ] = useState(null);
  const [ recommendations, setRecommendations ] = useState([]);
  const [ videos, setVideos ] = useState([]);
  
  const { id } = useParams();
  const options = {
  method: 'GET',
  headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I4NzY1YmI3NjhmNDk2NzYxZjIyNDNmMWU0NmFhOCIsIm5iZiI6MTc3ODQzOTExNi41NTksInN1YiI6IjZhMDBkM2NjNzU4NmZhYzAwN2VjMjNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a_cYW1DYqE248Sf96CMGSoo2kncU8yrI2cn7CKizFRs'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      const trailer = res.results.find(video => video.type === "Trailer" && video.site === "YouTube");
      if(trailer) {
        setVideos(trailer);
      }
      else{
        setVideos(null);
      }
    })
    .catch(err => console.error(err));
  },[id]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setRecommendations(res.results || []))
      .catch(err => console.error(err));
  }, [id]);
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then(res => res.json())
    .then(res => setMovie(res))
    .catch(err => console.error(err));
  }, [id]);


  const logWatchHistory = async () => {
  try {
    await fetch('http://localhost:3001/api/watch-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // sends the cookie automatically
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path
      })
    });
  } catch (err) {
    console.error('Failed to log watch history', err);
  }
};

  if(!movie) {
    return <p className="flex items-center justify-center h-screen text-white
    text-lg">Loading...</p>
  }

  return (
    <div className='min-h-screen text-white'>
      <div 
        className='relative h-[70vh] flex' 
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
              
              <Link to={videos ? `https://www.youtube.com/watch?v=${videos.key}` : "#"} target="_blank">
                <button 
                onClick={logWatchHistory}
                className="flex justify-center space-x-1 items-center bg-white hover:opacity-70 font-bold text-black mt-2 md:mt-4 px-5 py-3 rounded-md">
                  <Play className='mr-2 h-5 fill-black'/>Watch Now
                </button>
              </Link>
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

              <li>
                <span className='font-semibold text-white'>Original Language: </span>
                <span className="ml-2">{movie.original_language?.toUpperCase()}</span>
              </li>

              <li>
                <span className='font-semibold text-white'>Budget: </span>
                <span className='ml-2'>{movie.budget? `$${movie.budget.toLocaleString()}`: "N/A" }</span>
              </li>

              <li>
                <span className='font-semibold text-white'>Revenue: </span>
                <span className='ml-2'>{movie.budget? `$${movie.revenue.toLocaleString()}`: "N/A" }</span>
              </li>

              <li>
                <span className='font-semibold text-white'>Production Companies: </span>
                <span className='ml-2'>
                  {movie.production_companies &&
                  movie.production_companies.length > 0 ?
                  movie.production_companies.map((c) => c.name).join(", ") : "N/A"}
                </span>
              </li>
              
              <li>
                <span className='font-semibold text-white'>Countries: </span>
                <span className='ml-2'>
                  {movie.production_countries &&
                  movie.production_countries.length > 0 ?
                  movie.production_countries.map((c) => c.name).join(", ") : "N/A"}
                </span>
              </li>

              <li>
                <span className='font-semibold text-white'>Spoken Languages: </span>
                <span className='ml-2'>
                  {movie.production_spoken_languages &&
                  movie.production_spoken_languages.length > 0 ?
                  movie.production_spoken_languages.map((l) => l.name).join(", ") : "N/A"}
                </span>
              </li>

            </ul>
          </div>

          <div className='flex-1 '>
            <h3 className='font-semibold text-white mb-2'>Tagline</h3>
            <p className='text-gray-400 italic mb-6'>{movie.tagline || "N/A"}</p>
            <h3 className='font-semibold text-white mb-2'>Overview</h3>
            <p className='text-gray-200'>{movie.overview || "N/A"}</p>
          </div>

        </div>
      </div>

      {recommendations.length > 0 && (
        <div className='p-8'>
          <h2 className='text-2xl font-semibold mb-4'>You might also like...</h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {recommendations.slice(0,5).map((rec) => (
              <div key={rec.id} className='bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition'>
                <Link to={`/movie/${rec.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500/${rec.backdrop_path}`}
                  className='w-full h-48 object-cover'/>
                  <div className='p-2'>
                    <h3 className='font-semibold text-white'>{rec.title}</h3>
                    <span className='text-xs text-gray-400'>{rec.release_date}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Moviepage;