import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { media_getList } from '../../actions/media';
import './Slider.css';
import tmdbConfigs from '../../configs/tmdb';
import { BsCalendarFill } from 'react-icons/bs';
import { GiJusticeStar } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const Slider = ({ HeaderIcon, heading, mediaType, mediaCategory, casts, medias }) => {
    const [movies, setMovies] = useState([]);
    const { isDark } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (casts === null) {
            const getMedia = async () => {
                if (medias === null) {
                    const response_media = await dispatch(media_getList({ mediaType, mediaCategory, page: 1 }));
                    // console.log(response_media.results);
                    setMovies(response_media.results);
                }
                else {
                    setMovies(medias);
                }
            };
            getMedia();
        }
        else {
            setMovies(casts);
        }
    }, [mediaCategory, mediaType, dispatch, casts]);
    return (
        <div className='col-md-10 col-11 mx-auto my-5'>
            <h3 className='sliderHeader mb-3 d-flex justity-content-center align-items-center' style={{ color: isDark ? 'white' : 'black' }}>
                <HeaderIcon className='me-3' style={{ color: 'rgb(11 96 224)' }} />
                {heading}
            </h3>
            <div className="horizontal-scroll-wrapper squares"  >
                {
                    movies.map((movie, index) => {
                        return (

                            <div className='horizontalSlides' key={index} style={{
                                backgroundImage: `url(${casts === null ?
                                    tmdbConfigs.backdropPath(movie.poster_path || movie.backdrop_path)
                                    : tmdbConfigs.posterPath(movie.profile_path)
                                    })`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', color: 'white'
                            }}>
                                <NavLink to={`/${mediaType}/${movie.id}`} className='insideHorizontal d-flex flex-column justify-content-end align-items-start p-2' style={{ color: 'white', textDecoration: 'none' }}>
                                    {
                                        casts === null ?
                                            <>
                                                <div className='UpperTransition d-flex align-items-center'>
                                                    <GiJusticeStar className='me-2' style={{ color: '#f8b803', fontSize: '20px' }} />{movie.vote_average}/10
                                                </div>
                                                <div className='UpperTransition'>
                                                    <BsCalendarFill className='me-2' style={{ color: 'rgb(51 205 247)' }} />{movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('/')[0]}
                                                </div>
                                            </> : ''
                                    }
                                    <div style={{ fontSize: '17px', fontWeight: '800' }} className='UpperTransition'>
                                        {
                                            movie.title ? (movie.title.length > 25 ? movie.title.substring(0, 22) + '...' : movie.title)
                                                : (movie.name.length > 25 ? movie.name.substring(0, 22) + '...' : movie.name)
                                        }
                                    </div>
                                </NavLink>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Slider
