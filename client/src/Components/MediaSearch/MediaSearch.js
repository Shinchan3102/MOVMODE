import React, { useEffect, useState } from 'react'
import './MediaSearch.css';
import { CiSearch } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { media_search } from '../../actions/media';
import { BiSlider } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

const MediaSearch = () => {
    const [query, setQuery] = useState("");
    const [mediaType, setMediaType] = useState("movie");
    const [medias, setMedias] = useState([]);
    const dispatch = useDispatch();
    const [display, setDisplay] = useState('none');

    const handleFilter = () => {
        console.log(display);
        setDisplay(display === 'none' ? 'block' : 'none');
    }

    useEffect(() => {
        const getSearch = async () => {
            const data = await dispatch(media_search({ mediaType, query, page: 1 }));
            setMedias(data.data.results);
        }
        if (query.trim().length > 0)
            getSearch();
        else {
            setMedias([]);
        }
    }, [query, mediaType]);
    return (

        <div className='position-relative'>
            <div className='searchBox d-flex justify-content-around align-items-center'>
                <CiSearch className='me-2' style={{ color: 'white', fontWeight: '700', fontSize: '20px', backdropFilter: 'blur(2px)' }} />
                <input type={'text'} placeholder='Search Your Movie' value={query} onChange={(e) => {
                    setQuery(e.target.value.trim())
                }} />
                <div className={`searchResultBox ${query.length > 0 ? 'p-2 px-3' : ''}`}>
                    {
                        medias.map((media, index) => {
                            return (
                                <>
                                    <NavLink to={`/media/${mediaType}/${media.id}`} className='searchResultBoxElement' key={index}>
                                        {
                                            media.title || media.name
                                        }
                                    </NavLink>
                                    <hr className='mx-auto' />
                                </>
                            )
                        })
                    }
                    {
                        (query.length > 0 && medias.length === 0 ?
                            <div className='m-1 ps-2 searchResultBoxElement'>
                                No results found
                            </div> : '')
                    }
                </div>
                <BiSlider className='filter' style={{ fontSize: '20px', cursor: 'pointer' }} onClick={handleFilter} />
                <div className='categorySetterBox' style={{ display: display }}>
                    <ImCross className='crossIcon' onClick={() => setDisplay('none')} />
                    <div className='my-2' style={{ fontWeight: '500' }}>Choose Your Search Category:</div>
                    <div>
                        <div className={`${mediaType === 'movie' ? 'setBg' : ''}`} onClick={() => {
                            setMediaType('movie');
                            setDisplay('none');
                        }}>Movie</div>
                        <div className={`${mediaType === 'tv' ? 'setBg' : ''}`} onClick={() => {
                            setMediaType('tv');
                            setDisplay('none');
                        }}>TV Series</div>
                        <div className={`${mediaType === 'person' ? 'setBg' : ''}`} onClick={() => {
                            setMediaType('person');
                            setDisplay('none');
                        }}>Person</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaSearch
