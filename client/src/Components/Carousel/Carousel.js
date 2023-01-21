import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genre_getList, media_getList } from '../../actions/media';
import './Carousel.css';
import tmdbConfigs from '../../configs/tmdb';
import { NavLink } from 'react-router-dom';

const Carousel = ({ mediaType, mediaCategory }) => {
    const { isDark } = useSelector((state) => state.user);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getMedia = async () => {
            const response_media = await dispatch(media_getList({ mediaType, mediaCategory, page: 1 }));
            setMovies(response_media.results);
        }
        getMedia();
        const getGenre = async () => {
            const response_genre = await dispatch(genre_getList({ mediaType }));
            setGenres(response_genre.response.genres);
        }
        getGenre();
    }, [mediaCategory, mediaType]);

    return (
        <div className="slider">
            <div className="slides">
                {
                    movies.map((movie, index) => {
                        return (
                            <div className='slide' key={index} style={{ backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})` }}>
                                <div className={`insideSlide_${isDark ? 'black' : 'white'} d-flex justify-content-center align-items-start flex-column my-5`} style={{ color: `${isDark ? 'white' : 'black'}` }} >
                                    <h1 className='my-5'>
                                        {movie.title || movie.name}
                                    </h1>
                                    <div className='my-3 carouselElement'>
                                        <span className="rating_chart" data-percent={`${movie.vote_average}`} data-scale-color="#ffb400">
                                            <span>
                                                {movie.vote_average}
                                            </span>
                                        </span>
                                        <span>{movie.genre_ids.slice(0,2).map((id, index) => {
                                            return (
                                                <button className='btn Danger mx-2' style={{ borderRadius: '20px' }} key={index}>{genres.find(genre => genre.id === id)?.name}</button>
                                            )
                                        })}
                                        </span>
                                    </div>
                                    <div className='my-3 carouselElement'>
                                        {movie.overview.length>250?movie.overview.slice(0,247)+'...':movie.overview}
                                    </div>
                                    <NavLink to={`/media/${mediaType}/${movie.id}`} className='btn Danger my-2'>Watch now</NavLink>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Carousel
