import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { media_getList } from '../../actions/media';
import tmdbConfigs from '../../configs/tmdb';
import './MediaList.css';
import '../Slider/Slider.css';
import Carousel from '../Carousel/Carousel';
import { GiJusticeStar } from 'react-icons/gi';
import { BsCalendarFill, BsChevronExpand,BsFillBookmarkStarFill  } from 'react-icons/bs';
import Footer from '../Footer/Footer';
import { HiCollection } from 'react-icons/hi';


const MediaList = () => {
    const { mediaType } = useParams();
    console.log(mediaType);
    const [medias, setMedias] = useState([]);
    const [page, setPage] = useState(1);
    const [currCategory, setCurrCategory] = useState("popular");
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        setPage(1);
        setCurrCategory('popular');
    }, [location]);

    useEffect(()=>{
        setPage(1);
        const getMedia=async()=>{
            const data=await dispatch(media_getList({mediaType,mediaCategory:currCategory,page}));
            setMedias(data.results);
        }
        getMedia();
    },[currCategory]);

    useEffect(() => {
        const getMedia = async () => {
            // console.log(mediaType);
            // console.log(page);
            const data = await dispatch(media_getList({ mediaType, mediaCategory: currCategory, page }));
            // console.log(data);
            if (page === 1)
                setMedias([...data.results]);
            else
                setMedias([...medias, ...data.results]);
        }
        getMedia();
    }, [mediaType, page]);
    console.log(medias)
    return (
        <div>
            <Carousel mediaType={mediaType} mediaCategory={currCategory} />
            <div className='col-10-md col-11 mx-auto setMediaCategory'>
                <div className='categoryHead'>
                    <div className='categoryHeadDiv' style={{color:'white'}}>
                        {currCategory==='popular'?<div className='d-flex align-items-center'><HiCollection className='me-2' />Popular</div>
                        :
                        <div className='d-flex align-items-center'><BsFillBookmarkStarFill className='me-2' />Top Rated</div>}
                        <BsChevronExpand className='expandIcon' onClick={()=>{setCurrCategory(currCategory==='popular'?'top_rated':'popular')}}/>
                    </div>
                </div>
            </div>
            <div className=' col-10-md col-11 mx-auto d-flex flex-wrap justify-content-center'>
                {
                    medias.map((media, index) => {
                        return (
                            <div className='cardCont horizontalSlides' style={{ backgroundImage: `url(${tmdbConfigs.posterPath(media.poster_path || media.backdrop_path)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} key={index}>
                                <NavLink to={`/media/${mediaType}/${media.id}`} className='insideHorizontal d-flex flex-column justify-content-end align-items-start p-2' style={{ color: 'white', textDecoration: 'none' }}>

                                    <div className='UpperTransition d-flex align-items-center'>
                                        <GiJusticeStar className='me-2' style={{ color: '#f8b803', fontSize: '20px' }} />{media.vote_average}/10
                                    </div>
                                    <div className='UpperTransition'>
                                        <BsCalendarFill className='me-2' style={{ color: 'rgb(51 205 247)' }} />{media.release_date?.split('-')[0] || media.first_air_date.split('/')[0]}
                                    </div>
                                    <div style={{ fontSize: '17px', fontWeight: '800' }} className='UpperTransition'>
                                        {
                                            media.title ? (media.title.length > 25 ? media.title.substring(0, 22) + '...' : media.title)
                                                : (media.name.length > 25 ? media.name.substring(0, 22) + '...' : media.name)
                                        }
                                    </div>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
            <div className='col-md-10 col-11 mx-auto text-center'>
                <button className='btn Danger mt-3 mx-auto' onClick={() => { setPage(page + 1) }}>Load More</button>
            </div>

            <Footer />
        </div>
    )
}

export default MediaList
