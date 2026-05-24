import React from 'react'
import Hero from '../src/components/Hero'
import CardList from '../src/components/CardList'
import Footer from '../src/components/Footer'
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Homepage = () => {
  const [watchHistory, setWatchHistory] = useState([]);    
    useEffect(() => {
    fetch('http://localhost:3001/api/watch-history', {
        credentials: 'include' // sends cookie automatically
    })
        .then(res => res.json())
        .then(data => setWatchHistory(data.history || []))
        .catch(err => console.error(err));
    }, []);
  
  return (
    <div>
        <Hero/>
        {watchHistory.length > 0 && (
          <div className='px-8 py-4'>
            <h2 className='text-xl font-semibold text-white mb-3'>Continue Watching</h2>
            <div className='flex gap-4 overflow-x-auto scrollbar-hide'>
              {watchHistory.map((item) => (
                <Link to={`/movie/${item.movieId}`} key={item.movieId} className='shrink-0'>
                  <div className='w-36 hover:scale-105 transition'>
                    <img
                      src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                      alt={item.title}
                      className='w-full h-52 object-cover rounded-lg'
                    />
                    <p className='text-sm mt-1 text-gray-300 truncate'>{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <CardList title="Critically Acclaimed TV Shows" category="now_playing"/>
        <CardList title="Suspenseful US TV Drama" category="top_rated"/>
        <CardList title="Award-winning TV Thrillers" category="popular"/>
        <CardList title="Japanese Anime" category="upcoming"/>
        <Footer/>
    </div>
  )
}

export default Homepage