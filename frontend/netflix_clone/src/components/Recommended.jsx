import React, { useState, useEffect, useEffectEvent } from 'react';
import { Link } from 'react-router';

const Recommended = ({movieTitles}) => {
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I4NzY1YmI3NjhmNDk2NzYxZjIyNDNmMWU0NmFhOCIsIm5iZiI6MTc3ODQzOTExNi41NTksInN1YiI6IjZhMDBkM2NjNzU4NmZhYzAwN2VjMjNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a_cYW1DYqE248Sf96CMGSoo2kncU8yrI2cn7CKizFRs'
    }
    };


    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMovie = async (title) => {
        const encodedTitle = encodeURIComponent(title);
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`


        try {
            const response = await fetch(url, options)
            const data = await response.json();

            return data.results?.[0] || null;
        } catch (error) {
            console.log(error)
            return null;
        }
    };

    useEffect(()=> {
        const loadMovies = async () => {
            setLoading(true);
            const results = await Promise.all(movieTitles.map((title) => fetchMovie(title)));

            setMovies(results.filter(Boolean));
            setLoading(false);
        };

        if(movieTitles?.length){
            loadMovies();
        }
    }, [movieTitles]);


    if(loading){
        return <p className='text-white'>
            Loading...
        </p>
    }
    return (
    <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        {movies.map((movie) => (
            <Link 
            to={`/movie/${movie.id}`} 
            key={movie.id} 
            className='bg-[#232323] rounded-lg overflow-hidden'>
                {movie.backdrop_path? 
                  <img 
                  src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`} 
                  className='w-full h-48 object-cover'
                  alt={movie.title} /> : <p className= "text-white">No image..</p>}

                  <div className='my-2'>
                    <h3 className='text-white text-sm font-semibold truncate ml-2'>
                        {movie.title}
                    </h3>
                    <p className='text-xs text-gray-400 ml-2'>{movie.release_date? movie.release_date.slice(0,4) : "N/A"} </p>
                  </div>
            </Link>
        ))}
    </div>
    )
}

export default Recommended;