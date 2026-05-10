import React from 'react'
import Hero from '../src/components/Hero'
import CardList from '../src/components/CardList'
import Footer from '../src/components/Footer'
const Homepage = () => {
  return (
    <div>
        <Hero/>
        <CardList title="Critically Acclaimed TV Shows" category="now_playing"/>
        <CardList title="Suspenseful US TV Drama" category="top_rated"/>
        <CardList title="Award-winning TV Thrillers" category="popular"/>
        <CardList title="Japanese Anime" category="upcoming"/>
        <Footer/>
    </div>
  )
}

export default Homepage