import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { media_getDetail } from '../../actions/media';
import tmdbConfigs from '../../configs/tmdb';
import Navbar from '../Navbar/Navbar';
import './MediaDetail.css';
import { BsHeartFill } from 'react-icons/bs';
import Slider from '../Slider/Slider';
import { IoIosPeople } from 'react-icons/io';
import { fav_add, fav_remove } from '../../actions/favorite';
import Video from '../Video/Video';
import {TfiLayoutSliderAlt} from 'react-icons/tfi';
import Review from '../Review/Review';

const MediaDetail = () => {
    const { mediaType, mediaId } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();

    const { listFavorites, isDark } = useSelector(state => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getDetail = async () => {
            const detail = await dispatch(media_getDetail({ mediaType, mediaId }));
            setMedia(detail.media);
            setIsFavorite(detail.media.isFavorite);
            setGenres(detail.media.genres);
        }
        getDetail();
    }, [mediaId, mediaType, dispatch]);

    const handleFavorite = () => {
           if(user?.token){
            if(!isFavorite){
                dispatch(fav_add({
                    mediaId,
                    mediaType,
                    mediaTitle:media.title || media.name,
                    mediaPoster:media.poster_path,
                    mediaRate:media.vote_average,
                }));
                setIsFavorite(true);
            }
            else{
                const favorite=listFavorites.find(e=>e.mediaId===mediaId);
                dispatch(fav_remove({favoriteId:favorite._id}));
                setIsFavorite(false);
            }
           }
           else{
            dispatch({type:'REG'})
           }
    }

    return (
        <div>
            {
                media && (<>
                    <div className='detailCont' style={{ backgroundImage: `url(${tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                    </div>
                    <div style={{ position: 'absolute', width: '100vw' }} className='d-flex flex-column'>
                        <div className={`insideSlide_${isDark ? 'black' : 'white'} detailCont2 d-flex flex-wrap justify-content-around`} style={{ color: `${isDark ? 'white' : 'black'}`, padding: '120px 100px' }} >
                            <img src={`${tmdbConfigs.posterPath(media.poster_path || media.backdrop_path)}`} alt='' />
                            <div>
                                <div style={{ fontSize: '50px', fontWeight: '700', wordWrap: 'break-wrap' }} className='setWidth my-2'>
                                    {media.title || media.name}
                                </div>
                                <div style={{ fontSize: '50px', fontWeight: '700' }} className='setWidth my-2' >
                                    {media?.release_date?.split('-')[0] || media?.first_air_date?.split('/')[0]}
                                </div>
                                <div className='setWidth d-flex flex-wrap align-items-center my-2'>
                                    {media.vote_average}
                                    {
                                        genres.map((genre) => {
                                            return (
                                                <div className='m-2 chip'>
                                                    {genre.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='setWidth my-2'>
                                    {media.overview}
                                </div>
                                <div className='setWidth d-flex align-items-center my-3'>
                                    <div className='favCont'>
                                        <BsHeartFill className='favIcon' style={{ color: `${isFavorite ? 'red' : 'white'}` }} onClick={handleFavorite} />
                                    </div>
                                </div>
                                <div className='setWidth'>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: `${isDark?'#000317':'white'}`,color:`${!isDark?'black':'white'}` }}>
                            <Slider HeaderIcon={IoIosPeople} heading={"CASTS"} mediaType={'person'} mediaCategory={null} casts={media.credits.cast} medias={null} />
                            <Video videos={media.videos.results.slice(0,6)} backdrops={media.images.backdrops} />
                            {
                                media.recommend.length>0?
                                <Slider HeaderIcon={TfiLayoutSliderAlt} heading={"YOU MAY ALSO LIKE"} mediaType={mediaType} mediaCategory={null} casts={null} medias={media.recommend} />
                                :
                                <Slider HeaderIcon={TfiLayoutSliderAlt} heading={"YOU MAY ALSO LIKE"} mediaType={mediaType} mediaCategory={tmdbConfigs.mediaCategory.top_rated} casts={null} medias={null} />
                            }
                            <Review media={media} mediaType={mediaType} reviews={media.reviews} />
                        </div>
                    </div>
                </>
                )}
        </div>
    )
}

export default MediaDetail
