import React from 'react';
import Carousel from '../Carousel/Carousel';
import Navbar from '../Navbar/Navbar';
import tmdbConfigs from '../../configs/tmdb';
import Slider from '../Slider/Slider';
import Footer from '../Footer/Footer';
import { HiCollection } from 'react-icons/hi';
import { BsFillBookmarkStarFill } from 'react-icons/bs';

const Home = () => {

  const sections = [
    [HiCollection, "POPULAR MOVIES", tmdbConfigs.mediaType.movie, tmdbConfigs.mediaCategory.popular, null, null],
    [BsFillBookmarkStarFill, "TOP RATED MOVIES", tmdbConfigs.mediaType.movie, tmdbConfigs.mediaCategory.top_rated, null, null],
    [HiCollection, 'POPULAR SERIES', tmdbConfigs.mediaType.tv, tmdbConfigs.mediaCategory.popular, null,null],
    [BsFillBookmarkStarFill, 'TOP RATED SERIES', tmdbConfigs.mediaType.tv, tmdbConfigs.mediaCategory.top_rated, null, null]
  ];


  return (
    <div>
      <Carousel mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
      {
        sections.map((section, index) => {
          return (
            <Slider HeaderIcon={section[0]} heading={section[1]} mediaType={section[2]} mediaCategory={section[3]} casts={section[4]} medias={section[5]} key={index} />
          )
        })
      }
      <Footer />
    </div>
  )
}

export default Home
