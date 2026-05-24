import React, { useEffect, useState } from 'react';
import CardImg from "../assets/cardimg.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router';

const CardList = ({title, category}) => {
    const [data, setData] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2I4NzY1YmI3NjhmNDk2NzYxZjIyNDNmMWU0NmFhOCIsIm5iZiI6MTc3ODQzOTExNi41NTksInN1YiI6IjZhMDBkM2NjNzU4NmZhYzAwN2VjMjNkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a_cYW1DYqE248Sf96CMGSoo2kncU8yrI2cn7CKizFRs'
        }
    };

    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setData(res.results))
        .catch(err => console.error(err));
    },[]);
    
    
    return (
    <div className="text-white md:x-4">
        <h2 className="pt-4 pb-4 font-bold tracking-wide text-lg">{title}</h2>
        <Swiper className='mySwiper'>
            {data.map((item, idx) =>
                <SwiperSlide key={idx}
                className='max-w-72' >
                    <Link to={`/movie/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="" className="w-full h-44 object-center object-cover px-0.5" />
                        <p className="mx-1 mt-2 font-semibold">{item.original_title}</p>
                    </Link> 
                </SwiperSlide>
            )}
        </Swiper>
    </div>
    );
}

export default CardList;